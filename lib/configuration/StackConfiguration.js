"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLambdaSourcePath = exports.environment = exports.stackTags = exports.LAMBDA_ROLE = exports.DOCUMENT_PROCESSOR_LAMBDA_NAME = exports.LambdaType = exports.S3_BUCKET_NAME = exports.APPLICATION_NAME = void 0;
exports.APPLICATION_NAME = 'document-processor';
exports.S3_BUCKET_NAME = `${exports.APPLICATION_NAME}-bucket`;
var LambdaType;
(function (LambdaType) {
    LambdaType["PUT"] = "put";
})(LambdaType = exports.LambdaType || (exports.LambdaType = {}));
;
exports.DOCUMENT_PROCESSOR_LAMBDA_NAME = `${exports.APPLICATION_NAME}-${LambdaType.PUT}`;
exports.LAMBDA_ROLE = `${exports.APPLICATION_NAME}-lambda-role`;
exports.stackTags = {
    tags: {
        squad: 'Everest',
        billing: 'Accounting',
    }
};
exports.environment = 'us-west-2-dev';
const getLambdaSourcePath = (env) => `${__dirname}../../../${env === 'local' ? 'src' : 'dist'}`;
exports.getLambdaSourcePath = getLambdaSourcePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhY2tDb25maWd1cmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU3RhY2tDb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsZ0JBQWdCLEdBQUcsb0JBQW9CLENBQUM7QUFDeEMsUUFBQSxjQUFjLEdBQUcsR0FBRyx3QkFBZ0IsU0FBUyxDQUFDO0FBQzNELElBQVksVUFFWDtBQUZELFdBQVksVUFBVTtJQUNsQix5QkFBVyxDQUFBO0FBQ2YsQ0FBQyxFQUZXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBRXJCO0FBQUEsQ0FBQztBQUNXLFFBQUEsOEJBQThCLEdBQUcsR0FBRyx3QkFBZ0IsSUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDekUsUUFBQSxXQUFXLEdBQUcsR0FBRyx3QkFBZ0IsY0FBYyxDQUFDO0FBRWhELFFBQUEsU0FBUyxHQUFFO0lBQ3BCLElBQUksRUFBQztRQUNELEtBQUssRUFBRSxTQUFTO1FBQ2hCLE9BQU8sRUFBRSxZQUFZO0tBQ3hCO0NBQ0osQ0FBQztBQUNXLFFBQUEsV0FBVyxHQUFVLGVBQWUsQ0FBQztBQUMzQyxNQUFNLG1CQUFtQixHQUFHLENBQUMsR0FBVSxFQUFTLEVBQUUsQ0FBQyxHQUFHLFNBQVMsWUFBWSxHQUFHLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFBLE1BQU0sRUFBRSxDQUFDO0FBQXRHLFFBQUEsbUJBQW1CLHVCQUFtRiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBBUFBMSUNBVElPTl9OQU1FID0gJ2RvY3VtZW50LXByb2Nlc3Nvcic7XHJcbmV4cG9ydCBjb25zdCBTM19CVUNLRVRfTkFNRSA9IGAke0FQUExJQ0FUSU9OX05BTUV9LWJ1Y2tldGA7XHJcbmV4cG9ydCBlbnVtIExhbWJkYVR5cGUge1xyXG4gICAgUFVUID0gJ3B1dCdcclxufTtcclxuZXhwb3J0IGNvbnN0IERPQ1VNRU5UX1BST0NFU1NPUl9MQU1CREFfTkFNRSA9IGAke0FQUExJQ0FUSU9OX05BTUV9LSR7TGFtYmRhVHlwZS5QVVR9YDtcclxuZXhwb3J0IGNvbnN0IExBTUJEQV9ST0xFID0gYCR7QVBQTElDQVRJT05fTkFNRX0tbGFtYmRhLXJvbGVgO1xyXG5cclxuZXhwb3J0IGNvbnN0IHN0YWNrVGFncyA9e1xyXG4gICAgdGFnczp7XHJcbiAgICAgICAgc3F1YWQ6ICdFdmVyZXN0JyxcclxuICAgICAgICBiaWxsaW5nOiAnQWNjb3VudGluZycsXHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBlbnZpcm9ubWVudDpzdHJpbmcgPSAndXMtd2VzdC0yLWRldic7XHJcbmV4cG9ydCBjb25zdCBnZXRMYW1iZGFTb3VyY2VQYXRoID0gKGVudjpzdHJpbmcpOnN0cmluZyA9PiBgJHtfX2Rpcm5hbWV9Li4vLi4vLi4vJHtlbnYgPT09ICdsb2NhbCcgPyAnc3JjJzonZGlzdCd9YDtcclxuIl19