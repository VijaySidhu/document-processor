"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3 = exports.payCheckServiceInputBucket = void 0;
const core_1 = require("@aws-cdk/core");
const s3 = require("@aws-cdk/aws-s3");
const iam = require("@aws-cdk/aws-iam");
const StackConfiguration_1 = require("../lib/configuration/StackConfiguration");
class S3 extends core_1.NestedStack {
    constructor(scope, id, stackProps) {
        super(scope, id, stackProps);
        this.createBucket();
    }
    createBucket() {
        exports.payCheckServiceInputBucket = new s3.Bucket(this, `${StackConfiguration_1.S3_BUCKET_NAME}`, {
            bucketName: StackConfiguration_1.S3_BUCKET_NAME,
            publicReadAccess: false,
            encryption: s3.BucketEncryption.S3_MANAGED,
            // automatically empty the bucket's contents when our stack is deleted, which enables us to delete the bucket.
            autoDeleteObjects: true,
            removalPolicy: core_1.RemovalPolicy.DESTROY
        });
        // Grant read access to owner of account
        const accountOwnerReadWriteAccess = new iam.AccountRootPrincipal();
        exports.payCheckServiceInputBucket.grantRead(accountOwnerReadWriteAccess);
        exports.payCheckServiceInputBucket.grantWrite(accountOwnerReadWriteAccess);
        // If want to grant write permission to lambda function
        // s3Bucket.grantWrite(lambda);
    }
}
exports.S3 = S3;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUzMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBc0Y7QUFDdEYsc0NBQXNDO0FBQ3RDLHdDQUF3QztBQUN4QyxnRkFBdUU7QUFHdkUsTUFBYSxFQUFHLFNBQVEsa0JBQVc7SUFHL0IsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxVQUE0QjtRQUNsRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVNLFlBQVk7UUFDZixrQ0FBMEIsR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLEdBQUcsbUNBQWMsRUFBRSxFQUFDO1lBQ2hFLFVBQVUsRUFBQyxtQ0FBYztZQUN6QixnQkFBZ0IsRUFBQyxLQUFLO1lBQ3RCLFVBQVUsRUFBRSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsVUFBVTtZQUMxQyw4R0FBOEc7WUFDOUcsaUJBQWlCLEVBQUMsSUFBSTtZQUN0QixhQUFhLEVBQUMsb0JBQWEsQ0FBQyxPQUFPO1NBQ3RDLENBQUMsQ0FBQTtRQUVGLHdDQUF3QztRQUN4QyxNQUFNLDJCQUEyQixHQUFHLElBQUksR0FBRyxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDbkUsa0NBQTBCLENBQUMsU0FBUyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDbEUsa0NBQTBCLENBQUMsVUFBVSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFFbkUsdURBQXVEO1FBQ3ZELCtCQUErQjtJQUNuQyxDQUFDO0NBRUo7QUEzQkQsZ0JBMkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb25zdHJ1Y3QsIE5lc3RlZFN0YWNrLCBOZXN0ZWRTdGFja1Byb3BzLCBSZW1vdmFsUG9saWN5fSBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xyXG5pbXBvcnQgKiBhcyBzMyBmcm9tICdAYXdzLWNkay9hd3MtczMnO1xyXG5pbXBvcnQgKiBhcyBpYW0gZnJvbSAnQGF3cy1jZGsvYXdzLWlhbSc7XHJcbmltcG9ydCB7UzNfQlVDS0VUX05BTUV9IGZyb20gXCIuLi9saWIvY29uZmlndXJhdGlvbi9TdGFja0NvbmZpZ3VyYXRpb25cIjtcclxuXHJcbmV4cG9ydCBsZXQgcGF5Q2hlY2tTZXJ2aWNlSW5wdXRCdWNrZXQ6czMuQnVja2V0O1xyXG5leHBvcnQgY2xhc3MgUzMgZXh0ZW5kcyBOZXN0ZWRTdGFjayB7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHN0YWNrUHJvcHM6IE5lc3RlZFN0YWNrUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHN0YWNrUHJvcHMpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQnVja2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZUJ1Y2tldCh0aGlzOiB0aGlzKXtcclxuICAgICAgICBwYXlDaGVja1NlcnZpY2VJbnB1dEJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcyxgJHtTM19CVUNLRVRfTkFNRX1gLHtcclxuICAgICAgICAgICAgYnVja2V0TmFtZTpTM19CVUNLRVRfTkFNRSxcclxuICAgICAgICAgICAgcHVibGljUmVhZEFjY2VzczpmYWxzZSxcclxuICAgICAgICAgICAgZW5jcnlwdGlvbjogczMuQnVja2V0RW5jcnlwdGlvbi5TM19NQU5BR0VELFxyXG4gICAgICAgICAgICAvLyBhdXRvbWF0aWNhbGx5IGVtcHR5IHRoZSBidWNrZXQncyBjb250ZW50cyB3aGVuIG91ciBzdGFjayBpcyBkZWxldGVkLCB3aGljaCBlbmFibGVzIHVzIHRvIGRlbGV0ZSB0aGUgYnVja2V0LlxyXG4gICAgICAgICAgICBhdXRvRGVsZXRlT2JqZWN0czp0cnVlLFxyXG4gICAgICAgICAgICByZW1vdmFsUG9saWN5OlJlbW92YWxQb2xpY3kuREVTVFJPWVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIEdyYW50IHJlYWQgYWNjZXNzIHRvIG93bmVyIG9mIGFjY291bnRcclxuICAgICAgICBjb25zdCBhY2NvdW50T3duZXJSZWFkV3JpdGVBY2Nlc3MgPSBuZXcgaWFtLkFjY291bnRSb290UHJpbmNpcGFsKCk7XHJcbiAgICAgICAgcGF5Q2hlY2tTZXJ2aWNlSW5wdXRCdWNrZXQuZ3JhbnRSZWFkKGFjY291bnRPd25lclJlYWRXcml0ZUFjY2Vzcyk7XHJcbiAgICAgICAgcGF5Q2hlY2tTZXJ2aWNlSW5wdXRCdWNrZXQuZ3JhbnRXcml0ZShhY2NvdW50T3duZXJSZWFkV3JpdGVBY2Nlc3MpO1xyXG5cclxuICAgICAgICAvLyBJZiB3YW50IHRvIGdyYW50IHdyaXRlIHBlcm1pc3Npb24gdG8gbGFtYmRhIGZ1bmN0aW9uXHJcbiAgICAgICAgLy8gczNCdWNrZXQuZ3JhbnRXcml0ZShsYW1iZGEpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=