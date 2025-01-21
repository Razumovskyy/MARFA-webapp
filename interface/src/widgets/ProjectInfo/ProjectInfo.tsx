"use client";
// @ts-nocheck
import React from "react";
import * as Styled from "./ui/ProjectInfo.styles";
import { Grid, Card, CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@/shared/ui"

export const ProjectInfo = () => {

  const goToCalculation = () => {
    window.location.href = "/"
  };

  return (
    <Styled.ProjectInfoContainer
      sx={{
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <Typography
        color="primary"
        variant="h3"
        textAlign="center"
        sx={{ fontWeight: "bold", opacity: 0.9 }}
      >
        Molecular atmospheric Absorption with Rapid and Flexible Analysis (MARFA)
      </Typography>

      <Grid container spacing={4} maxWidth="lg" justifyContent="center">
        {/* Блок с кнопкой */}
        <Grid item xs={12} md={8}>
          <Button
            onClick={goToCalculation}
            color="primary"
            variant="contained"
            size="large"
            sx={{ width: "100%" }}
          >
            Go to calculation
          </Button>
        </Grid>

        {/* Описание MARFA */}
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="body1" fontSize="medium" fontWeight="medium">
                This web application features a lightweight version of the <b>MARFA</b> code. <p/> MARFA is a Fortran-based
                tool specifically designed to calculate volume molecular absorption coefficients or monochromatic
                absorption cross-sections, utilizing initial spectroscopic data and a given atmospheric profile.
                <p />
                To utilize the full capabilities of the model, such as calculating spectra for all atmospheric levels
                simultaneously and applying ꭓ-corrections, we recommend downloading and running the source code available
                at:{" "}
                <a
                  href="https://github.com/Razumovskyy/MARFA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/Razumovskyy/MARFA
                </a>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Ссылка на preprint */}
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="body1" fontSize="medium" fontWeight="medium">
                The MARFA tool is described in detail in the following preprint:
                <br />
                <>
                  Razumovskiy Mikhail, Boris Fomin, and Denis Astanin.
                  <a
                    href="https://arxiv.org/abs/2411.03418"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i>
                      {" "}
                      MARFA: An Effective Line-by-line Tool for Calculating Absorption Coefficients and Cross-sections
                      in Planetary Atmospheres
                    </i>
                  </a>
                  . arXiv preprint arXiv:2411.03418 (2024).
                </>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Информация о разработчиках */}
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="body1" fontSize="medium" fontWeight="medium">
                This platform was developed by:
                <ul>
                  <li>
                    <b>Mikhail Razumovskiy</b>, scientific researcher and web developer:{" "}
                    <a
                      href="https://github.com/Razumovskyy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://github.com/Razumovskyy
                    </a>
                    , mrazumovskyy@gmail.com
                  </li>
                  <li>
                    <b>Denis Astanin</b>, web developer at BiTronics Lab:{" "}
                    <a
                      href="https://github.com/DisaAst"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://github.com/DisaAst
                    </a>
                  </li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Styled.ProjectInfoContainer>
  );
};