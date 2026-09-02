/**
 * Ambient type declaration for CaseForm component.
 * Ensures typecheck passes cleanly before Emir's FINAL-CASE-02 component is merged.
 */
declare module "@/components/case-create/CaseForm" {
  import type React from "react";
  import type { CaseFormProps } from "../fixtures/case-form";

  export const CaseForm: React.ComponentType<CaseFormProps>;
}
