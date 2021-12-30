import {Construct, NestedStackProps, Stack, StackProps} from "@aws-cdk/core";
import {Lambdas} from "./Lambdas";
import {S3} from "./S3";

export class ApplicationStack extends Stack {
    lambda:Lambdas;
    s3:S3;

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);
        // Create S3 bucket
        this.s3 = new S3(this,'s3-stack',<NestedStackProps>props)
        // Create all lambda functions
        this.lambda = new Lambdas(this,'lambda-stack',<NestedStackProps>props);
    }

}
