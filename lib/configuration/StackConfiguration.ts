export const APPLICATION_NAME = 'document-processor';
export const S3_BUCKET_NAME = `${APPLICATION_NAME}-bucket`;
export enum LambdaType {
    PUT = 'put'
};
export const DOCUMENT_PROCESSOR_LAMBDA_NAME = `${APPLICATION_NAME}-${LambdaType.PUT}`;
export const LAMBDA_ROLE = `${APPLICATION_NAME}-lambda-role`;

export const stackTags ={
    tags:{
        squad: 'Everest',
        billing: 'Accounting',
    }
};
export const environment:string = 'us-west-2-dev';
export const getLambdaSourcePath = (env:string):string => `${__dirname}../../../${env === 'local' ? 'src':'dist'}`;
