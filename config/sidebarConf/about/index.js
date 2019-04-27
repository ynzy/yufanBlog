const CurriculumVitae = require('./CurriculumVitae/index');
const SelfIntroduction = require('./SelfIntroduction/index');
const utils = require('../../../utils/index');
const children = ['', CurriculumVitae, SelfIntroduction,]
module.exports =[
    utils.genSidebar('about', children, true ),
];
