export interface IModuleDefinition {
  name: string;
  entry: string;
  title: string;
}

export interface IModulesDefinition {
  modules: Array<IModuleDefinition>;
}

export type TEnvironmentType = "development" | "production" | "test";
