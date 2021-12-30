import {AssetCode, Function as LambdaFunction, Runtime} from "@aws-cdk/aws-lambda";
import {Construct, Duration, NestedStack, NestedStackProps} from "@aws-cdk/core";
import * as lambdaEventSources from '@aws-cdk/aws-lambda-event-sources';
import {
    DOCUMENT_PROCESSOR_LAMBDA_NAME,
    environment,
    getLambdaSourcePath, LAMBDA_ROLE,
    LambdaType,
} from "../lib/configuration/StackConfiguration";
import { ManagedPolicy, Role, ServicePrincipal} from "@aws-cdk/aws-iam";
import {IamUtils} from "./utils/IamUtils";
import * as s3Bucket from '@aws-cdk/aws-s3';
import {payCheckServiceInputBucket} from "./S3";
// 2 minutes
const LAMBDA_TIMEOUT = 120;

export let docProcessorLambda: LambdaFunction;
export let role: Role



export class Lambdas extends NestedStack {


    constructor(scope: Construct, id: string, stackProps: NestedStackProps) {
        super(scope, id, stackProps);
        this.setupRole();
        this.setupFunctions();
    }

    private setupFunctions(this: this) {
        const handlerName = 'lambda.handler';

        docProcessorLambda = this.createLambda(handlerName,DOCUMENT_PROCESSOR_LAMBDA_NAME,LambdaType.PUT);
        this.s3PutEventSource(docProcessorLambda,"trip-sheet",".pdf");
    }

    private setupRole(this: this) {
        // Create new Iam Role
        role = IamUtils.createNewIamRole(this
            , `${LAMBDA_ROLE}`
            , new ServicePrincipal("lambda.amazonaws.com"));

        // Add Basic AWS managed Lambda execution role to give cloud watch permissions to lambda to write logs
        role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'));

    }

    private createLambda(handlerName: string,lambdaName:string,lambdaType: string) {
        const lamda =  new LambdaFunction(this, `${lambdaName}`,
            {
                code: new AssetCode(`${getLambdaSourcePath(environment)}/main/lambda/${lambdaType}`),
                environment: {
                    ACCOUNT_ENV: environment,
                    AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
                    LOG_LEVEL: 'info',
                },
                functionName: `${lambdaName}`,
                handler: handlerName,
                memorySize: 128,
                runtime: Runtime.NODEJS_14_X,
                role,
                timeout: Duration.seconds(LAMBDA_TIMEOUT)
            }
        );



        return lamda;
    }

    private s3PutEventSource(lambda:LambdaFunction,prefix:string,suffix:string){
        const s3PutEventSource = new lambdaEventSources.S3EventSource(payCheckServiceInputBucket, {
            events: [
                s3Bucket.EventType.OBJECT_CREATED_PUT
            ],
            filters:  [
                {
                    prefix: prefix,
                    suffix: suffix
                }],
        });

        lambda.addEventSource(s3PutEventSource);
    }


}



