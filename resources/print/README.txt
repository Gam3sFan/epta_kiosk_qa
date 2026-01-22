This folder is packaged into the app as extraResources/print.

To enable silent PDF printing on Windows:
1) Place a helper executable here named:
   - print-helper.exe (default)
   - PDFtoPrinter.exe (supported out of the box)
2) Configure PRINT_HELPER_ARGS in the environment.

PRINT_HELPER_ARGS supports tokens:
- {pdf} -> absolute path to the PDF file
- {printer} -> printer name (optional)

Example for SumatraPDF (if you rename it to print-helper.exe):
PRINT_HELPER_ARGS="-silent -print-to \"{printer}\" {pdf}"

If PRINT_DEVICE_NAME is not set, Electron will attempt to use the default printer.

Fallback behavior:
- If the helper is missing or fails, the app falls back to Electron's
  webContents.print with silent=true.
