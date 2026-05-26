export type AgentKey =
  | "ssma"
  | "pmoc"
  | "rtm"
  | "shutdown"
  | "proposal"
  | "facilities"
  | "juridico";

export type AgentDefinition = {
  key: AgentKey;
  name: string;
  description: string;
  systemPrompt: string;
};
