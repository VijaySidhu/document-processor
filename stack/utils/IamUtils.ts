import {Role, ServicePrincipal} from "@aws-cdk/aws-iam";
import {Construct} from "@aws-cdk/core";

export class IamUtils {

    public static createNewIamRole(scope:Construct,
                                   id:string,
                                   servicePrincipal:ServicePrincipal):Role{
       return new Role(scope,id,{
            assumedBy:servicePrincipal
        })
    }


}