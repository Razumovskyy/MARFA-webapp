"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"
import { useStateType } from "@/shared/util/useStateType"
import { moleculeSpectreFormData } from "@/entities/MoleculeSpectre"
import { requestFormData } from "@/entities/MoleculeSpectre/models/types"

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
  const [spectreData, setSpectreData] = useState<requestFormData | null>(null)

  return (
    <MoleculeSpectreContext.Provider
      value={{ screenState, setScreenState, zipUrl, setZipUrl, id, setId, spectreData, setSpectreData }}>
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