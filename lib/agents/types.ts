export type AgentKey =
  | "ssma"
  | "pmoc"
  | "rtm"
  | "shutdown"
  | "proposal"
  | "facilities"
;

export type AgentDefinition = {
  key: AgentKey;
  name: string;
  description: string;
  systemPrompt: string;
};
