// Export all metamodel classes and impls
export * from './lib/metamodel/api/eobject.js';
export * from './lib/metamodel/impl/eobjectimpl.js';
export * from './lib/metamodel/api/eoperation.js';
export * from './lib/metamodel/api/epackage.js';
export * from './lib/metamodel/impl/epackageimpl.js';
export * from './lib/metamodel/api/eattribute.js';
export * from './lib/metamodel/api/eclass.js';
export * from './lib/metamodel/api/eclassifier.js';
export * from './lib/metamodel/ecorepackage.js';
export * from './lib/metamodel/api/edata-type.js';
export * from './lib/metamodel/api/eenum-literal.js';
export * from './lib/metamodel/api/eenum.js';
export * from './lib/metamodel/api/efactory.js';
export * from './lib/metamodel/basicelist.js';
export * from './lib/metamodel/api/elist.js';
export * from './lib/metamodel/api/emodel-element.js';
export * from './lib/metamodel/api/enamed-element.js';
export * from './lib/metamodel/api/eparameter.js';
export * from './lib/metamodel/api/ereference.js';
export * from './lib/metamodel/api/estructural-feature.js';
export * from './lib/metamodel/api/etyped-element.js';
export * from './lib/metamodel/impl/ereference-impl.js';
export * from './lib/metamodel/impl/edata-type-impl.js';
export * from './lib/metamodel/impl/eclass-impl.js';
export * from './lib/metamodel/impl/eenum-impl.js';
export * from './lib/metamodel/impl/eenum-literal-impl.js';
export * from './lib/metamodel/impl/eattribute-impl.js';
export * from './lib/metamodel/impl/eoperation-impl.js';
export * from './lib/metamodel/impl/eparameter-impl.js';

//Export Utils
export * from './lib/utils/pair.js';

// Export Source Code Generation tools
export * from './lib/source-generators/tgenerator-main.js';
export * from './lib/source-generators/tgenerator-factory.js';
export * from './lib/source-generators/tgenerator-package.js';

export * from './lib/json/tjson.js';
export * from './lib/tutils.js';

// Export TMF generation tools
export * from './lib/ecore/ecoreparser.js';
export * from './lib/ecore/ecorewriter.js';
export * from './lib/ecore/ecore-string-parser.js';
export * from './lib/ecore/ecore-string-writer.js';
export * from './lib/source-generators/modelgenutils.js';