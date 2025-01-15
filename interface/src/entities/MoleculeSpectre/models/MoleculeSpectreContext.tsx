"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"
import { useStateType } from "@/shared/util/useStateType"

interface MoleculeSpectreContextType {
  screenState: number;
  setScreenState: useStateType<number>;
  setId: useStateType<number | null>;
  setZipUrl: useStateType<string | null>;
  id: number | null;
  zipUrl: string | null
}

const MoleculeSpectreContext = createContext<MoleculeSpectreContextType | undefined>(undefined)

interface MoleculeSpectreContextProviderProps {
  children: ReactNode;
}

export function MoleculeSpectreContextProvider({ children }: MoleculeSpectreContextProviderProps) {
  const [screenState, setScreenState] = useState<number>(0)
  const [zipUrl, setZipUrl] = useState<string | null>(null)
  const [id, setId] = useState<number | null>(null)
  const [spectreInterval, setSpectreInterval] = useState<{ start: number, finish: number } | null>(null)

  return (
    <MoleculeSpectreContext.Provider
      value={{ screenState, setScreenState, zipUrl, setZipUrl, id, setId, spectreInterval, setSpectreInterval }}>
      {children}
    </MoleculeSpectreContext.Provider>
  )
}

export function useMolecularSpectreData() {
  const context = useContext(MoleculeSpectreContext)
  if (!context) {
    throw new Error("MoleculeSpectreContext must be used within a MoleculeSpectreContextProvider")
  }
  return context
}