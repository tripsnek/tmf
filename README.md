# TMF
TypeScript Modeling Framework - A TypeScript port of Eclipse EMF with Ecore-driven code generation, reflection, eopposites, containment, etc. Built to support the TripSnek european travel optimization app.


## Known Limitations

This is not a feature complete implementation of EMF. The following EMF Ecore features are not yet supported:

 - **EAnnotations**
 - **EDataType.instanceClassName** - used in EMF to specify e.g. a specific Java Class that represents a new datatype
 - **Some EAttribute/Reference properties** - unsettable, resolveProxies
 - **EGenericType** - no support for generic type systems
 - **eExceptions**
 - **References between ECore models** - every ecore model is standalone, there currently is not support for composing ecore models together.