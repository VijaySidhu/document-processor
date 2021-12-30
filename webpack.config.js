const path = require('path');
const {readdirSync,accessSync} = require('fs');

module.exports = ()=>{
    const entry = {

    };

     const sourceDir = '.\\src\\main';
    // Build up list of lambdas
    const lambdaDir = `${sourceDir}\\lambda`;
    readdirSync(lambdaDir).forEach(directory=>{
        const lambda = `././${lambdaDir}/${directory}/lambda.js`;
        try{
            accessSync(lambda);
            entry[`/main/lambda/${directory}/lambda.js`] = lambda;

        }catch (e){
            console.log('Non lambda directory excluded from entry ',directory);
        }
    });
    return {
        entry,
        externals: ['aws-sdk'],
        mode: process.env.NODE_ENV === 'prod' ? 'production':'none',
        module: {
            rules: [{
                exclude: /node_modules/,
                test: /\.ts?$/,
                use:'ts-loader'
            }]
        },
        output: {
            filename: '[name]',
            library: {
                type: 'commonjs-module',
            },

            path: path.resolve(__dirname,'dist/')
        },
        resolve: {
            extensions: ['.ts','.js']
        },
        target: 'node'
    };

};