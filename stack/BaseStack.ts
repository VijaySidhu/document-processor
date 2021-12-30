import {Construct, Stack, StackProps} from "@aws-cdk/core";
export interface Props extends StackProps{
    readonly app?:string;

}
export  declare class BaseStack extends Stack{
    constructor(scope:Construct,id:string,props?:Props);
}