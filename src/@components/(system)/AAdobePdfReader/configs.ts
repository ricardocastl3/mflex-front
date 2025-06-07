export const viewerConfig = {
  /* If true, tools such as sticky note, highlight, and so on appear in the quick tools menu. */
  showAnnotationTools: true,

  /* If true, form filling is enabled and users can edit fields. */
  enableFormFilling: true,

  /* If true, a download button appears in the overflow menu on the top bar. */
  showDownloadPDF: false,

  /* If true, then a print PDF option appears in the overflow menu on the top bar. */
  showPrintPDF: false,

  /* If true, the zoom controls are displayed on the right hand panel. */
  showZoomControl: true,
  embedMode: "FULL_WINDOW",
  /* Allowed possible values are 'FIT_PAGE', 'FIT_WIDTH', 'TWO_COLUMN', 'TWO_COLUMN_FIT_PAGE', or ''.
        FIT_WIDTH expands the page horizontally to the full width of the document pane.
        FIT_PAGE displays the entire page in the current view so that no scrolling is required.
        TWO_COLUMN displays two pages side-by-side in the current view.
        TWO_COLUMN_FIT_PAGE displays two pages side-by-side where the pages are zoomed to page level.
        Note that end users can toggle the view mode on the right hand panel. */
  defaultViewMode: "FULL_WINDOW",
};
