import path from 'path';
import loader from '../src/loader';

const context = {
    cacheable: jest.fn(),
    addDependency: jest.fn(),
};
const mockDir = path.resolve(__dirname, 'mocks');
let mockOptions;

jest.mock('loader-utils', () => ({
    getOptions: () => mockOptions,
}));

describe('=== loader test ===', () => {
    let _loader;

    beforeAll(() => {
        _loader = (options) => {
            mockOptions = options;
            return loader.call(context, 'some style content');
        };
    });

    describe('inline variables', () => {
        let variables;

        beforeEach(() => {
            variables = {
                var1: 'red',
                var2: 'navy',
            };
        });

        test('scss', () => {
            const result = _loader({ variables, style: 'scss' });
            expect(result).toMatchSnapshot();
        });

        test('sass', () => {
            const result = _loader({ variables, style: 'sass' });
            expect(result).toMatchSnapshot();
        });

        test('less', () => {
            const result = _loader({ variables, style: 'less' });
            expect(result).toMatchSnapshot();
        });

        test('stylus', () => {
            const result = _loader({ variables, style: 'stylus' });
            expect(result).toMatchSnapshot();
        });
    });

    describe('input files', () => {
        // test('from js', () => {
        //     const result = _loader({
        //         files: [
        //             path.resolve(mockDir, 'fromJs.js'),
        //         ]
        //     });

        //     expect(result).toMatchSnapshot();
        // });

        test('from json', () => {
            const result = _loader({
                files: [
                    path.resolve(mockDir, 'fromJSON.json'),
                ] 
            });

            expect(result).toMatchSnapshot();
        });

        // test('both types', () => {
        //     const result = _loader({ files: './test/mocks/*.*' });
        //     expect(result).toMatchSnapshot();
        // });
    });

    // describe('hot load', () => {
    //     const files = [
    //         path.resolve(mockDir, 'fromJs.js'),
    //     ];

    //     beforeAll(() => {
    //         _loader({ files, hot: true });
    //     });

    //     test('run by files change', () => {
    //         expect(context.addDependency).toHaveBeenCalledTimes(files.length);
    //         files.forEach((file) => {
    //             expect(context.addDependency).toBeCalledWith(file);
    //         });
    //     });
    // });
});
