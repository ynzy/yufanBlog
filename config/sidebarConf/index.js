

const CurriculumVitae = require('./about/CurriculumVitae/index');
const SelfIntroduction = require('./about/SelfIntroduction/index');
const about = require('./about/index')
module.exports = {
    '/about/CurriculumVitae/': CurriculumVitae,
    '/about/SelfIntroduction/': SelfIntroduction,
    // '/about':about
    // '/': ['']
};