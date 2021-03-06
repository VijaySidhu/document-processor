"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationStack = void 0;
const core_1 = require("@aws-cdk/core");
const Lambdas_1 = require("./Lambdas");
const S3_1 = require("./S3");
class ApplicationStack extends core_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Create S3 bucket
        this.s3 = new S3_1.S3(this, 's3-stack', props);
        // Create all lambda functions
        this.lambda = new Lambdas_1.Lambdas(this, 'lambda-stack', props);
    }
}
exports.ApplicationStack = ApplicationStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb25TdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkFwcGxpY2F0aW9uU3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0NBQTZFO0FBQzdFLHVDQUFrQztBQUNsQyw2QkFBd0I7QUFFeEIsTUFBYSxnQkFBaUIsU0FBUSxZQUFLO0lBSXZDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBaUI7UUFDdkQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEIsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxPQUFFLENBQUMsSUFBSSxFQUFDLFVBQVUsRUFBbUIsS0FBSyxDQUFDLENBQUE7UUFDekQsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxpQkFBTyxDQUFDLElBQUksRUFBQyxjQUFjLEVBQW1CLEtBQUssQ0FBQyxDQUFDO0lBQzNFLENBQUM7Q0FFSjtBQVpELDRDQVlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb25zdHJ1Y3QsIE5lc3RlZFN0YWNrUHJvcHMsIFN0YWNrLCBTdGFja1Byb3BzfSBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xyXG5pbXBvcnQge0xhbWJkYXN9IGZyb20gXCIuL0xhbWJkYXNcIjtcclxuaW1wb3J0IHtTM30gZnJvbSBcIi4vUzNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvblN0YWNrIGV4dGVuZHMgU3RhY2sge1xyXG4gICAgbGFtYmRhOkxhbWJkYXM7XHJcbiAgICBzMzpTMztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogU3RhY2tQcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG4gICAgICAgIC8vIENyZWF0ZSBTMyBidWNrZXRcclxuICAgICAgICB0aGlzLnMzID0gbmV3IFMzKHRoaXMsJ3MzLXN0YWNrJyw8TmVzdGVkU3RhY2tQcm9wcz5wcm9wcylcclxuICAgICAgICAvLyBDcmVhdGUgYWxsIGxhbWJkYSBmdW5jdGlvbnNcclxuICAgICAgICB0aGlzLmxhbWJkYSA9IG5ldyBMYW1iZGFzKHRoaXMsJ2xhbWJkYS1zdGFjaycsPE5lc3RlZFN0YWNrUHJvcHM+cHJvcHMpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=