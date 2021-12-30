import 'source-map-support/register';
import {App, StackProps} from "@aws-cdk/core";
import {APPLICATION_NAME, stackTags} from "../lib/configuration/StackConfiguration";
import {ApplicationStack} from "../stack/ApplicationStack";
const app = new App();
const props:StackProps = {
    tags:stackTags.tags
};
new ApplicationStack(app,APPLICATION_NAME,props);
