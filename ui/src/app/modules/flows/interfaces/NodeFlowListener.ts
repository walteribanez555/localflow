export interface NodeFlowListener {
  close: () => void;
  submit: () => void;
  cancel: () => void;
}
