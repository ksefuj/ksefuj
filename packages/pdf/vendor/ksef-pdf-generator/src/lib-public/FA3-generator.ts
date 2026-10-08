import pdfMake, { TCreatedPdf } from 'pdfmake/build/pdfmake';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { generateStyle, getValue, hasValue } from '@shared/PDF-functions';
import { generateAdnotacje } from './generators/FA3/Adnotacje';
import { generateDodatkoweInformacje } from './generators/FA3/DodatkoweInformacje';
import { generatePlatnosc } from './generators/FA3/Platnosc';
import { generatePodmioty } from './generators/FA3/Podmioty';
import { generatePodsumowanieStawekPodatkuVat } from './generators/FA3/PodsumowanieStawekPodatkuVat';
import { generateRabat } from './generators/FA3/Rabat';
import { generateSzczegoly } from './generators/FA3/Szczegoly';
import { generateWarunkiTransakcji } from './generators/FA3/WarunkiTransakcji';
import { generateWiersze } from './generators/FA3/Wiersze';
import { generateZamowienie } from './generators/FA3/Zamowienie';
import { generateDaneFaKorygowanej } from './generators/common/DaneFaKorygowanej';
import { generateNaglowek } from './generators/common/Naglowek';
import { generateRozliczenie } from './generators/common/Rozliczenie';
import { generateStopka } from './generators/common/Stopka';
import { Faktura } from './types/fa3.types';
import { ZamowienieKorekta } from './enums/invoice.enums';
import { AdditionalDataTypes } from './types/common.types';
import { generateWatermark } from '@shared/consts/watermark';
import { TRodzajFaktury } from '@shared/consts/FA.const';
import { Position } from '@shared/enums/common.enum';
import i18n from 'i18next';

// ksefuj patch: the upstream `import pdfFonts from 'pdfmake/build/vfs_fonts'` and the
// `pdfMake.addVirtualFileSystem(pdfFonts)` call were removed so the fonts are not inlined in this
// module. The adapter registers the fonts after a dynamic import (see packages/pdf/src/fonts).

export function generateFA3(invoice: Faktura, additionalData: AdditionalDataTypes): TCreatedPdf {
  return pdfMake.createPdf(generateFA3DocDefinition(invoice, additionalData));
}

// ksefuj patch: the document definition is built by a separate exported function (the former body
// of generateFA3) so the adapter and tests can inspect it without rendering a PDF.
export function generateFA3DocDefinition(
  invoice: Faktura,
  additionalData: AdditionalDataTypes
): TDocumentDefinitions {
  const isKOR_RABAT: boolean =
    invoice.Fa?.RodzajFaktury?._text == TRodzajFaktury.KOR && hasValue(invoice.Fa?.OkresFaKorygowanej);
  const rabatOrRowsInvoice: Content = isKOR_RABAT ? generateRabat(invoice.Fa!) : generateWiersze(invoice.Fa!);

  const docDefinition: TDocumentDefinitions = {
    ...generateWatermark(additionalData?.watermark),
    content: [
      ...generateNaglowek(invoice.Fa, additionalData, invoice.Zalacznik),
      generateDaneFaKorygowanej(invoice.Fa),
      ...generatePodmioty(invoice),
      generateSzczegoly(invoice.Fa!),
      rabatOrRowsInvoice,
      generateZamowienie(
        invoice.Fa?.Zamowienie,
        ZamowienieKorekta.Order,
        invoice.Fa?.P_15?._text ?? '',
        invoice.Fa?.RodzajFaktury?._text ?? '',
        invoice.Fa?.KodWaluty?._text ?? '',
        getValue(invoice.Fa?.Adnotacje?.PMarzy?.P_PMarzy) as string | undefined,
        // ksefuj patch: P_15ZK is passed through so KOR_ZAL can render it.
        invoice.Fa?.P_15ZK?._text
      ),
      generatePodsumowanieStawekPodatkuVat(invoice),
      generateAdnotacje(invoice.Fa?.Adnotacje),
      generateDodatkoweInformacje(invoice.Fa!),
      generateRozliczenie(invoice.Fa?.Rozliczenie, invoice.Fa?.KodWaluty?._text ?? ''),
      generatePlatnosc(invoice.Fa?.Platnosc),
      generateWarunkiTransakcji(invoice.Fa?.WarunkiTransakcji),
      ...generateStopka(additionalData, invoice.Stopka, invoice.Naglowek, invoice.Fa?.WZ, invoice.Zalacznik),
    ],
    footer: (currentPage, pageCount) => {
      // ksefuj patch: the disclaimer is printed on every page, next to the page counter.
      return {
        columns: [
          {
            text: i18n.t('invoice.footer.ksefujDisclaimer'),
            fontSize: 7,
            color: '#6B7280',
            width: '*',
            margin: [40, 2, 0, 0],
          },
          {
            text: `${currentPage.toString()} ${i18n.t('invoice.footer.pagesTotal')} ${pageCount}`,
            alignment: Position.RIGHT,
            width: 'auto',
            margin: [12, 0, 40, 0],
          },
        ],
      };
    },
    ...generateStyle(),
  };

  return docDefinition;
}
