import { getOptions } from 'loader-utils';
import glob from 'glob';
import convert from './convertor';

const defaultOptions = {
    style: 'scss',
    files: [],
    variables: {},
    hot: false,
    cwd: process.cwd()
}

export default function(source){
    this.cacheable();
    let options = getOptions(this);
    options = {
        ...defaultOptions,
        ...options
    }
    let { style, files, cwd, variables, hot } = options;
    if(typeof files === 'string'){
        files = glob.sync(files, {
            cwd,
            absolute: true
        });
    }
    const vars = files.reduce((vars, file) => {
        const data = require(file);
        return Object.assign(vars, data);
    }, {});
    if(hot){
        files.forEach(file => {
            this.addDependency(file);
        });
    }
    const result = Object.assign(vars, variables);
    return `${convert(result, style)}\n${source}`;
}