"use client";

import { createContext, type ReactNode, useCallback, useContext, useRef, useState } from "react";

interface FileHandoffContextValue {
  files: File[];
  setFiles: (files: File[]) => void;
  consumeFiles: () => File[];
}

const FileHandoffContext = createContext<FileHandoffContextValue | null>(null);

export function FileHandoffProvider({ children }: { children: ReactNode }) {
  const [files, setFilesState] = useState<File[]>([]);
  const filesRef = useRef<File[]>([]);

  const setFiles = useCallback((newFiles: File[]) => {
    filesRef.current = newFiles;
    setFilesState(newFiles);
  }, []);

  const consumeFiles = useCallback(() => {
    const consumed = filesRef.current;
    filesRef.current = [];
    setFilesState([]);
    return consumed;
  }, []);

  return (
    <FileHandoffContext.Provider value={{ files, setFiles, consumeFiles }}>
      {children}
    </FileHandoffContext.Provider>
  );
}

export function useFileHandoff() {
  const context = useContext(FileHandoffContext);
  if (!context) {
    throw new Error("useFileHandoff must be used within a FileHandoffProvider");
  }
  return context;
}
