import {Construct, NestedStack, NestedStackProps, RemovalPolicy} from "@aws-cdk/core";
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';
import {S3_BUCKET_NAME} from "../lib/configuration/StackConfiguration";

export let payCheckServiceInputBucket:s3.Bucket;
export class S3 extends NestedStack {


    constructor(scope: Construct, id: string, stackProps: NestedStackProps) {
        super(scope, id, stackProps);
        this.createBucket();
    }

    public createBucket(this: this){
        payCheckServiceInputBucket = new s3.Bucket(this,`${S3_BUCKET_NAME}`,{
            bucketName:S3_BUCKET_NAME,
            publicReadAccess:false,
            encryption: s3.BucketEncryption.S3_MANAGED,
            // automatically empty the bucket's contents when our stack is deleted, which enables us to delete the bucket.
            autoDeleteObjects:true,
            removalPolicy:RemovalPolicy.DESTROY
        })

        // Grant read access to owner of account
        const accountOwnerReadWriteAccess = new iam.AccountRootPrincipal();
        payCheckServiceInputBucket.grantRead(accountOwnerReadWriteAccess);
        payCheckServiceInputBucket.grantWrite(accountOwnerReadWriteAccess);

        // If want to grant write permission to lambda function
        // s3Bucket.grantWrite(lambda);
    }

}
