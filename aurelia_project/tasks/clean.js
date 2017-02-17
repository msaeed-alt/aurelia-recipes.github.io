import del from 'del';
import project from '../aurelia.json';

export default function clean() {
    return del([
        project.platform.output + '/**/*',
        project.postProcessor.output + '/**/*',
        project.localeProcessor.output + '/**/*',
    ]);
}
