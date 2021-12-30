"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lambdas = exports.role = exports.docProcessorLambda = void 0;
const aws_lambda_1 = require("@aws-cdk/aws-lambda");
const core_1 = require("@aws-cdk/core");
const lambdaEventSources = require("@aws-cdk/aws-lambda-event-sources");
const StackConfiguration_1 = require("../lib/configuration/StackConfiguration");
const aws_iam_1 = require("@aws-cdk/aws-iam");
const IamUtils_1 = require("./utils/IamUtils");
const s3Bucket = require("@aws-cdk/aws-s3");
const S3_1 = require("./S3");
// 2 minutes
const LAMBDA_TIMEOUT = 120;
class Lambdas extends core_1.NestedStack {
    constructor(scope, id, stackProps) {
        super(scope, id, stackProps);
        this.setupRole();
        this.setupFunctions();
    }
    setupFunctions() {
        const handlerName = 'lambda.handler';
        exports.docProcessorLambda = this.createLambda(handlerName, StackConfiguration_1.DOCUMENT_PROCESSOR_LAMBDA_NAME, StackConfiguration_1.LambdaType.PUT);
        this.s3PutEventSource(exports.docProcessorLambda, "trip-sheet", ".pdf");
    }
    setupRole() {
        // Create new Iam Role
        exports.role = IamUtils_1.IamUtils.createNewIamRole(this, `${StackConfiguration_1.LAMBDA_ROLE}`, new aws_iam_1.ServicePrincipal("lambda.amazonaws.com"));
        // Add Basic AWS managed Lambda execution role to give cloud watch permissions to lambda to write logs
        exports.role.addManagedPolicy(aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'));
    }
    createLambda(handlerName, lambdaName, lambdaType) {
        const lamda = new aws_lambda_1.Function(this, `${lambdaName}`, {
            code: new aws_lambda_1.AssetCode(`${(0, StackConfiguration_1.getLambdaSourcePath)(StackConfiguration_1.environment)}/main/lambda/${lambdaType}`),
            environment: {
                ACCOUNT_ENV: StackConfiguration_1.environment,
                AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
                LOG_LEVEL: 'info',
            },
            functionName: `${lambdaName}`,
            handler: handlerName,
            memorySize: 128,
            runtime: aws_lambda_1.Runtime.NODEJS_14_X,
            role: exports.role,
            timeout: core_1.Duration.seconds(LAMBDA_TIMEOUT)
        });
        return lamda;
    }
    s3PutEventSource(lambda, prefix, suffix) {
        const s3PutEventSource = new lambdaEventSources.S3EventSource(S3_1.payCheckServiceInputBucket, {
            events: [
                s3Bucket.EventType.OBJECT_CREATED_PUT
            ],
            filters: [
                {
                    prefix: prefix,
                    suffix: suffix
                }
            ],
        });
        lambda.addEventSource(s3PutEventSource);
    }
}
exports.Lambdas = Lambdas;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFtYmRhcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkxhbWJkYXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0RBQW1GO0FBQ25GLHdDQUFpRjtBQUNqRix3RUFBd0U7QUFDeEUsZ0ZBS2lEO0FBQ2pELDhDQUF3RTtBQUN4RSwrQ0FBMEM7QUFDMUMsNENBQTRDO0FBQzVDLDZCQUFnRDtBQUNoRCxZQUFZO0FBQ1osTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDO0FBTzNCLE1BQWEsT0FBUSxTQUFRLGtCQUFXO0lBR3BDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsVUFBNEI7UUFDbEUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU8sY0FBYztRQUNsQixNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQztRQUVyQywwQkFBa0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBQyxtREFBOEIsRUFBQywrQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQywwQkFBa0IsRUFBQyxZQUFZLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVPLFNBQVM7UUFDYixzQkFBc0I7UUFDdEIsWUFBSSxHQUFHLG1CQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUMvQixHQUFHLGdDQUFXLEVBQUUsRUFDaEIsSUFBSSwwQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7UUFFcEQsc0dBQXNHO1FBQ3RHLFlBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBYSxDQUFDLHdCQUF3QixDQUFDLDBDQUEwQyxDQUFDLENBQUMsQ0FBQztJQUU5RyxDQUFDO0lBRU8sWUFBWSxDQUFDLFdBQW1CLEVBQUMsVUFBaUIsRUFBQyxVQUFrQjtRQUN6RSxNQUFNLEtBQUssR0FBSSxJQUFJLHFCQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsVUFBVSxFQUFFLEVBQ25EO1lBQ0ksSUFBSSxFQUFFLElBQUksc0JBQVMsQ0FBQyxHQUFHLElBQUEsd0NBQW1CLEVBQUMsZ0NBQVcsQ0FBQyxnQkFBZ0IsVUFBVSxFQUFFLENBQUM7WUFDcEYsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFBRSxnQ0FBVztnQkFDeEIsbUNBQW1DLEVBQUUsR0FBRztnQkFDeEMsU0FBUyxFQUFFLE1BQU07YUFDcEI7WUFDRCxZQUFZLEVBQUUsR0FBRyxVQUFVLEVBQUU7WUFDN0IsT0FBTyxFQUFFLFdBQVc7WUFDcEIsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1lBQzVCLElBQUksRUFBSixZQUFJO1lBQ0osT0FBTyxFQUFFLGVBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO1NBQzVDLENBQ0osQ0FBQztRQUlGLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxNQUFxQixFQUFDLE1BQWEsRUFBQyxNQUFhO1FBQ3RFLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsK0JBQTBCLEVBQUU7WUFDdEYsTUFBTSxFQUFFO2dCQUNKLFFBQVEsQ0FBQyxTQUFTLENBQUMsa0JBQWtCO2FBQ3hDO1lBQ0QsT0FBTyxFQUFHO2dCQUNOO29CQUNJLE1BQU0sRUFBRSxNQUFNO29CQUNkLE1BQU0sRUFBRSxNQUFNO2lCQUNqQjthQUFDO1NBQ1QsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FHSjtBQWxFRCwwQkFrRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Fzc2V0Q29kZSwgRnVuY3Rpb24gYXMgTGFtYmRhRnVuY3Rpb24sIFJ1bnRpbWV9IGZyb20gXCJAYXdzLWNkay9hd3MtbGFtYmRhXCI7XHJcbmltcG9ydCB7Q29uc3RydWN0LCBEdXJhdGlvbiwgTmVzdGVkU3RhY2ssIE5lc3RlZFN0YWNrUHJvcHN9IGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIGxhbWJkYUV2ZW50U291cmNlcyBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhLWV2ZW50LXNvdXJjZXMnO1xyXG5pbXBvcnQge1xyXG4gICAgRE9DVU1FTlRfUFJPQ0VTU09SX0xBTUJEQV9OQU1FLFxyXG4gICAgZW52aXJvbm1lbnQsXHJcbiAgICBnZXRMYW1iZGFTb3VyY2VQYXRoLCBMQU1CREFfUk9MRSxcclxuICAgIExhbWJkYVR5cGUsXHJcbn0gZnJvbSBcIi4uL2xpYi9jb25maWd1cmF0aW9uL1N0YWNrQ29uZmlndXJhdGlvblwiO1xyXG5pbXBvcnQgeyBNYW5hZ2VkUG9saWN5LCBSb2xlLCBTZXJ2aWNlUHJpbmNpcGFsfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWlhbVwiO1xyXG5pbXBvcnQge0lhbVV0aWxzfSBmcm9tIFwiLi91dGlscy9JYW1VdGlsc1wiO1xyXG5pbXBvcnQgKiBhcyBzM0J1Y2tldCBmcm9tICdAYXdzLWNkay9hd3MtczMnO1xyXG5pbXBvcnQge3BheUNoZWNrU2VydmljZUlucHV0QnVja2V0fSBmcm9tIFwiLi9TM1wiO1xyXG4vLyAyIG1pbnV0ZXNcclxuY29uc3QgTEFNQkRBX1RJTUVPVVQgPSAxMjA7XHJcblxyXG5leHBvcnQgbGV0IGRvY1Byb2Nlc3NvckxhbWJkYTogTGFtYmRhRnVuY3Rpb247XHJcbmV4cG9ydCBsZXQgcm9sZTogUm9sZVxyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTGFtYmRhcyBleHRlbmRzIE5lc3RlZFN0YWNrIHtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgc3RhY2tQcm9wczogTmVzdGVkU3RhY2tQcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgc3RhY2tQcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zZXR1cFJvbGUoKTtcclxuICAgICAgICB0aGlzLnNldHVwRnVuY3Rpb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXR1cEZ1bmN0aW9ucyh0aGlzOiB0aGlzKSB7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlck5hbWUgPSAnbGFtYmRhLmhhbmRsZXInO1xyXG5cclxuICAgICAgICBkb2NQcm9jZXNzb3JMYW1iZGEgPSB0aGlzLmNyZWF0ZUxhbWJkYShoYW5kbGVyTmFtZSxET0NVTUVOVF9QUk9DRVNTT1JfTEFNQkRBX05BTUUsTGFtYmRhVHlwZS5QVVQpO1xyXG4gICAgICAgIHRoaXMuczNQdXRFdmVudFNvdXJjZShkb2NQcm9jZXNzb3JMYW1iZGEsXCJ0cmlwLXNoZWV0XCIsXCIucGRmXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0dXBSb2xlKHRoaXM6IHRoaXMpIHtcclxuICAgICAgICAvLyBDcmVhdGUgbmV3IElhbSBSb2xlXHJcbiAgICAgICAgcm9sZSA9IElhbVV0aWxzLmNyZWF0ZU5ld0lhbVJvbGUodGhpc1xyXG4gICAgICAgICAgICAsIGAke0xBTUJEQV9ST0xFfWBcclxuICAgICAgICAgICAgLCBuZXcgU2VydmljZVByaW5jaXBhbChcImxhbWJkYS5hbWF6b25hd3MuY29tXCIpKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIEJhc2ljIEFXUyBtYW5hZ2VkIExhbWJkYSBleGVjdXRpb24gcm9sZSB0byBnaXZlIGNsb3VkIHdhdGNoIHBlcm1pc3Npb25zIHRvIGxhbWJkYSB0byB3cml0ZSBsb2dzXHJcbiAgICAgICAgcm9sZS5hZGRNYW5hZ2VkUG9saWN5KE1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKCdzZXJ2aWNlLXJvbGUvQVdTTGFtYmRhQmFzaWNFeGVjdXRpb25Sb2xlJykpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUxhbWJkYShoYW5kbGVyTmFtZTogc3RyaW5nLGxhbWJkYU5hbWU6c3RyaW5nLGxhbWJkYVR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGxhbWRhID0gIG5ldyBMYW1iZGFGdW5jdGlvbih0aGlzLCBgJHtsYW1iZGFOYW1lfWAsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IG5ldyBBc3NldENvZGUoYCR7Z2V0TGFtYmRhU291cmNlUGF0aChlbnZpcm9ubWVudCl9L21haW4vbGFtYmRhLyR7bGFtYmRhVHlwZX1gKSxcclxuICAgICAgICAgICAgICAgIGVudmlyb25tZW50OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgQUNDT1VOVF9FTlY6IGVudmlyb25tZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIEFXU19OT0RFSlNfQ09OTkVDVElPTl9SRVVTRV9FTkFCTEVEOiAnMScsXHJcbiAgICAgICAgICAgICAgICAgICAgTE9HX0xFVkVMOiAnaW5mbycsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb25OYW1lOiBgJHtsYW1iZGFOYW1lfWAsXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBoYW5kbGVyTmFtZSxcclxuICAgICAgICAgICAgICAgIG1lbW9yeVNpemU6IDEyOCxcclxuICAgICAgICAgICAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzE0X1gsXHJcbiAgICAgICAgICAgICAgICByb2xlLFxyXG4gICAgICAgICAgICAgICAgdGltZW91dDogRHVyYXRpb24uc2Vjb25kcyhMQU1CREFfVElNRU9VVClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGxhbWRhO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgczNQdXRFdmVudFNvdXJjZShsYW1iZGE6TGFtYmRhRnVuY3Rpb24scHJlZml4OnN0cmluZyxzdWZmaXg6c3RyaW5nKXtcclxuICAgICAgICBjb25zdCBzM1B1dEV2ZW50U291cmNlID0gbmV3IGxhbWJkYUV2ZW50U291cmNlcy5TM0V2ZW50U291cmNlKHBheUNoZWNrU2VydmljZUlucHV0QnVja2V0LCB7XHJcbiAgICAgICAgICAgIGV2ZW50czogW1xyXG4gICAgICAgICAgICAgICAgczNCdWNrZXQuRXZlbnRUeXBlLk9CSkVDVF9DUkVBVEVEX1BVVFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBmaWx0ZXJzOiAgW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogcHJlZml4LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1ZmZpeDogc3VmZml4XHJcbiAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGFtYmRhLmFkZEV2ZW50U291cmNlKHMzUHV0RXZlbnRTb3VyY2UpO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5cclxuIl19