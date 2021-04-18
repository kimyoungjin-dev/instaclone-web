import "styled-components";

//styled-components의 타입 확장
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    fontColor: string;
  }
}
