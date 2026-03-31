"use client";

import { useEffect, useRef, useState } from "react";
import { useFileHandoff } from "@/contexts/file-handoff-context";
import { Validator } from "../validator";

interface ValidatorPageClientProps {
  locale: string;
}

export function ValidatorPageClient({ locale }: ValidatorPageClientProps) {
  const { consumeFiles } = useFileHandoff();
  const [initialFiles, setInitialFiles] = useState<File[] | undefined>(undefined);
  const consumed = useRef(false);

  useEffect(() => {
    if (!consumed.current) {
      consumed.current = true;
      const files = consumeFiles();
      if (files.length > 0) {
        setInitialFiles(files);
      }
    }
  }, [consumeFiles]);

  return <Validator locale={locale} initialFiles={initialFiles} />;
}
