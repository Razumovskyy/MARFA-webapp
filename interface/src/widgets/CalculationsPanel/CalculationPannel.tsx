"use client"
import * as Styled from "./ui/CalculationPanel.styles"
import { CalculateSpectre } from "@/features/MoleculeSpectre/CalculateSpectre"
import { MoleculeSpectreContextProvider } from "@/entities/MoleculeSpectre"
import { ResultPanel } from "@/widgets/CalculationsPanel/ui/ResultPanel"

export const CalculationPanel = () => {

  return (
    <MoleculeSpectreContextProvider>
      <Styled.CalculationPanel>
        <CalculateSpectre />
        <ResultPanel />
      </Styled.CalculationPanel>
    </MoleculeSpectreContextProvider>
  )
}

