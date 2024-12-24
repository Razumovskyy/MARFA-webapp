export const features = [
  "<b>Efficient Line-by-Line Technique:</b> Employs an effective interpolation method [Fomin, 1995] featuring nine grids to speed up line summation in the core of the tool.",
  "<b>Atmospheric Profile Handling:</b> Computes absorption coefficients or cross-sections based on atmospheric profiles provided via input files.\n",
  "<b>Line Shapes Support:</b> Supports standard line shapes with the Voigt profile set as the default. Additional line shapes can be manually added by implementing a specific abstract interface.",
  "<b>Line Wings Corrections:</b> Supports various chi-factors for implementing sub-Lorentzian behavior of wings of spectral lines. Custom chi-factors can be added manually.",
  "<b>Line Cut-Off Criterion:</b> Can be set as an input to control accuracy and match continuum parameters.",
  "<b>Line Databases Support:</b> Includes HITRAN2016 databases for CO₂ and H₂O within the source code. Custom databases can be introduced by preprocessing them into the required format.",
  "<b>PT-Tables Generation:</b> Generates resulting spectra as direct-access files in PT-format (each output file corresponds to one atmospheric level), which can be immediately introduced into radiative transfer schemes.",
  "<b>Additional Tools:</b> Provides various scripts for plotting and data pre-processing and post-processing, facilitating validation and the integration of new data."
]