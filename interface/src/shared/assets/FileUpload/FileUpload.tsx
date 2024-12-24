"use client"
import React, { useRef } from "react"
import * as Styled from "./FileUpload.styles"
import { Typography, useTheme } from "@mui/material"
import { Button } from "@/shared/ui"
import CloseIcon from "@mui/icons-material/Close"

export const FileUploader = ({ file, setFile, title, errors, disabled }) => {

  const theme = useTheme()
  const inputRef = useRef(null)

  function handleChangeFile(e) {
    setFile(e.target.files[0])
  }

  function deleteFile() {
    setFile(undefined)
  }

  function handleClick() {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleChangeFile}
      />
      {!file ? (
        <Button
          color={"primary"}
          variant={"contained"}
          onClick={handleClick}
          disabled={disabled}
        >
          {title || "Upload your atmospheric profile"}
        </Button>
      ) : (
        <Styled.FileUploadedContainer>
          <Typography sx={{ color: !!errors ? "#F21" : "#000"}}>{file.name}</Typography>
          <Button
            variant={"outlined"}
            color={"primary"}
            onClick={handleClick}
            disabled={disabled}
          >
            Upload new file
          </Button>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={deleteFile} />
        </Styled.FileUploadedContainer>
      )}
    </>
  )
}