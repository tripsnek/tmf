# TypeScript Modeling Framework (TMF)

[![npm version](https://img.shields.io/npm/v/@tripsnek/tmf.svg)](https://www.npmjs.com/package/@tripsnek/tmf)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

TMF is a lightweight TypeScript port of the Eclipse Modeling Framework (EMF) that brings model-driven development to the TypeScript ecosystem. Build type-safe, reflective data models that work seamlessly across your entire stack - from Node.js servers to React/Angular frontends.

## A Quick Demo video

[https://github.com/user-attachments/assets/ee35ca1a-24d5-4a43-8926-96dffecd8d0e](https://github.com/user-attachments/assets/208731e7-e674-45d6-af5b-6426763feed9)

Quick demonstration of adding types/features to an ecore model and generating code in a full stack reflective application, which can be downloaded from the [tmf-examples](https://github.com/tripsnek/tmf-examples) repository (specifically the [NX Angular/Node example](https://github.com/tripsnek/tmf-examples/tree/main/angular-node-nx)).

## Why TMF?

Traditional TypeScript development requires writing a lot of similar boilerplate over and over: DTOs, validation, serialization, API endpoints, database mappings. Each a tedious chore and potential risk of becoming a bug as your data model evolves.

TMF can help eliminate this repetition through powerful runtime reflection and code generation. By default this includes:

 - Runtime enforcement of **containment relationships**.
 - Runtime enforcement of **bi-directional relationships**.
 - Runtime **reflection/introspection** capabilities: Each instance provides convenient facilties for navigating and manipulating its structure and relationships without needing to code against the specific types and features.
 - **Code generated** source files for each data type that - beyond basic get/set functionality - provides all of the aforementioned capability.
 - **Serialization** (with TJson) that exploits containment relationships to turn complex object graphs into coherent trees. Its like if JSON.stringify() actually did something useful, and it is made possible by reflection.
 - **Editable implementation files** for each data type that let you extend the API for each type as you wish, enabling you to serialize directly to and from the same data objects that you use across your stack.
 - A **Visual Model Editor** VSCode extension ([TMF Ecore Editor](https://github.com/tripsnek/tmf-ecore-editor)) for intuitively editing your models and generating code with a few mouse clicks. 

For many applications, the above capabilities may be all you need, but even more value can be unlocked for applications that leverage reflection where possible throughout the stack, including:

- REST APIs that generate themselves - e.g. CRUD endpoints for each "root" container type
- UI components that build themselves - e.g. properties sheets that automatically build editors for each attribute field
- Database persistence layers that require zero manual mapping
- "Proxy resolution" strategies that identify references across containers and resolve them post-deserialization.
- In-place merge logic that can automatically diff to versions of the same instance and apply the changes from one to another (useful when an instance is already bound in your UI)
- Your own customized serialization strategies for your own data formats, or to satisfy integration or legacy data requirements

This README describes the basics of how reflection works, and many are demonstrated in the [tmf-examples](https://github.com/tripsnek/tmf-examples) repository, which contains multiple fully reflective full-stack architectures using Node, Angular and React (demonstrated in the above video).

## Installation

```bash
npm install @tripsnek/tmf
```

[Optonal] For visual model editing, install the VSCode extension:
1. Open VSCode
2. Search for "TMF Ecore Editor" in extensions
3. Install the extension

## Quick Start

### Step 1: Create Your Model

Create a new file `<your-model-name>.ecore` in VSCode. The TMF Ecore Editor will auto-initialize it with a package:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ecore:EPackage xmi:version="2.0" xmlns:xmi="http://www.omg.org/XMI" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:ecore="http://www.eclipse.org/emf/2002/Ecore" 
    name="blog" nsURI="http://example.org/blog" nsPrefix="blog">
</ecore:EPackage>
```

Use the visual editor to add classes, attributes, and references. You could also just edit the XML directly. Here is an example of a simple model for a Blog application:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ecore:EPackage xmi:version="2.0" xmlns:xmi="http://www.omg.org/XMI" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:ecore="http://www.eclipse.org/emf/2002/Ecore" 
    name="blog" nsURI="http://example.com/blog" nsPrefix="blog">
  
  <eClassifiers xsi:type="ecore:EClass" name="Blog">
    <eStructuralFeatures xsi:type="ecore:EAttribute" name="id" 
        eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EString"/>
    <eStructuralFeatures xsi:type="ecore:EAttribute" name="title" 
        eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EString"/>
    <eStructuralFeatures xsi:type="ecore:EReference" name="posts" 
        upperBound="-1" eType="#//Post" containment="true" eOpposite="#//Post/blog"/>
  </eClassifiers>
  
  <eClassifiers xsi:type="ecore:EClass" name="Post">
    <eStructuralFeatures xsi:type="ecore:EAttribute" name="title" 
        eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EString"/>
    <eStructuralFeatures xsi:type="ecore:EAttribute" name="content" 
        eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EString"/>
    <eStructuralFeatures xsi:type="ecore:EReference" name="blog" 
        eType="#//Blog" eOpposite="#//Blog/posts"/>
  </eClassifiers>
</ecore:EPackage>
```

### Step 2: Generate TypeScript Code

Click "Generate Code" in the VSCode editor, or run TMF's code generator. This creates type-safe TypeScript classes with full metamodel support.

You can also invoke TMF directly using 'npx' as follows: ```npx @tripsnek/tmf ./path/to/your/<myecorefile>.ecore```

This will create three folders in a src/ directory adjacent to the .ecore file:

 - `api/` contains interfaces for each of your types, as well as `*-package.ts`and `*-factory.ts` that define the metamodel at runtime and allow for reflective instantiation.
 - `gen/` contains abstract base classes that implemente basic get/set behavior and special TMF behaviors (reflection and containment/inverse reference maintencance). **DO NOT EDIT THESE**
 - `impl/` contains (initially empty) concrete classes you can extend as you like. **THESE ARE SAFE TO EDIT**

The generator can be configured in various useful ways, see ```npx @tripsnek/tmf --help``` for more information.

```typescript
export class BlogImpl extends BlogImplGen implements Blog {

  // Implement any operations you defined for your eclass in Ecore
  myBlogOperation(): void {
   //do something interesting
  }

  // Or add any other custom business logic that isn't exposed at the interface level
  validate(): boolean {
    return this.getTitle() !== null;
  }
    
}
```

### Step 3: Use Your Model

```typescript
import { BlogFactory, BlogPackage, Blog, Post } from '@myorg/blog';
import { TJson } from '@tripsnek/tmf';

// Initialize the package by 'touching' it (required for TJson serialization)
const pkg = BlogPackage.eINSTANCE;
const factory = BlogFactory.eINSTANCE;

// Create instances
const blog = factory.createBlog();
blog.setTitle("My Tech Blog");
blog.setId("blog_1");

const post = factory.createPost();
post.setTitle("Introduction to TMF");
post.setContent("TMF makes model-driven development straightforward...");

// Containment: adding post to blog automatically sets the inverse reference
blog.getPosts().add(post);
console.log(post.getBlog() === blog); // true - automatically maintained!

// Serialize to JSON
const json = TJson.makeJson(blog);
console.log(JSON.stringify(json, null, 2)); //your SAFELY stringified object

// Deserialize from JSON
const blogCopy = TJson.makeEObject(json) as Blog;
console.log(blogCopy.getPosts().get(0).getTitle()); // "Introduction to TMF"
```

## Understanding EMF Concepts

### Core Elements

**EPackage** - The root container for your model, defines namespace and contains classifiers

**EClass** - Represents a class in your model. Can be:
- *Concrete* - Standard instantiable class
- *Abstract* - Cannot be instantiated directly
- *Interface* - Defines contract without implementation

**EAttribute** - Simple typed properties (String, Int, Boolean, etc.)

**EReference** - Relationships between classes, with two key concepts:
- *Containment* - Parent-child relationship where child lifecycle is determined by parent
- *Opposite* - Bidirectional relationship that TMF keeps synchronized automatically. Use these only when you know both ends will be serialized as part of the same containment hierarchy or ["aggregate"](https://en.wikipedia.org/wiki/Domain-driven_design#aggregate_root) - the bundle of data that goes between your server and client all at once.

**EOperation** - Methods on your classes with parameters and return types

**EEnum** - Enumeration types with literal values

### EMF Data Types

When defining attributes and operation parameters, you can use these built-in Ecore data types:

**Primitive Types**
- `EString` - Text values (TypeScript: `string`)
- `EInt|EDouble|EFloat` - Numeric values with no distinction in TS (TypeScript: `number`)
- `EBoolean` - True/false values (TypeScript: `boolean`)
- `EDate` - Date/time values (TypeScript: `Date`)

**Classifier Types**
- `EClass` - References to other classes in your model
- `EEnum` - Your custom enumerations become TypeScript enums

**Type Modifiers**
- **Multiplicity**: Single-valued or Many-valued
- **ID**: Marks an attribute as the unique identifier
- **Transient**: Not persisted when serializing

### Key Modeling Patterns

**Containment Hierarchies**  
When a reference has `containment=true`, the reference creates parent-child hierarchies where children follow their parent's lifecycle:

```typescript
const blog = factory.createBlog();
const post1 = factory.createPost();
const post2 = factory.createPost();

// Posts are contained by blog
blog.getPosts().add(post1);
blog.getPosts().add(post2);

// When you serialize the blog, all contained posts are included
const json = TJson.makeJson(blog);  // Includes all posts
```

**Inverse References**  
When references have opposites, TMF maintains both sides automatically:
```typescript
// Setting one side...
blog.getPosts().add(post);
// ...automatically sets the other
console.log(post.getBlog() === blog); // true!
```

**ELists**

When the multiplicity is set to **many-valued**, TMF uses EList collections to maintain model integrity (i.e. to enforce inverse references and containment). The collection otherwise behaves as you would expect:

```typescript
const posts = blog.getPosts(); // Returns EList<Post>

// Standard operations
posts.add(newPost);
posts.remove(oldPost);
posts.get(0);
posts.size();
posts.clear();

// Iterate
for (const post of posts.elements()) {
  console.log(post.getTitle());
}

// Convert to array when needed
const array = posts.elements();
```

## Leveraging Reflection

TMF's real power comes from its reflection capabilities. While TMF itself provides the metamodel infrastructure, you can build powerful generic solutions on top of it.

### Example: Building a Generic REST CRUD server

This example shows how reflection enables you to create a trivial backend that works with any TMF model, with automatically generated REST endpoints over an in-memory datastore.

```typescript
import express from 'express';
import { EClass, EObject, TJson, TUtils } from '@tripsnek/tmf';
import { BlogPackage } from '@myorg/blog';

const app = express();
app.use(express.json());

// Initialize your package
const pkg = BlogPackage.eINSTANCE;

// Storage for instances (in production, this would be a database)
const storage = new Map<string, Map<string, EObject>>();

// Get all "root" classes (those which are not contained by anything else) from your model
const rootClasses = TUtils.getRootEClasses(pkg);

// Initialize storage for each class
rootClasses.forEach(eClass => {
  storage.set(eClass.getName(), new Map());
});

// Generate CRUD endpoints for each class automatically
rootClasses.forEach(eClass => {
  const className = eClass.getName();
  const classStore = storage.get(className)!;
  
  // GET all instances
  app.get(`/api/${className}`, (req, res) => {
    const instances = Array.from(classStore.values());
    res.json(TJson.makeJsonArray(instances));
  });
  
  // POST new instance
  app.post(`/api/${className}`, (req, res) => {
    const instance = TJson.makeEObject(req.body)!;
    // Get ID dynamically using reflection
    const idAttr = instance.eClass().getEStructuralFeature('id');
    if (idAttr) {
      const id = String(instance.eGet(idAttr));
      classStore.set(id, instance);
    }
    res.json(TJson.makeJson(instance));
  });
  
  // Additional endpoints: GET by ID, PUT, DELETE...
});

app.listen(3000);
```

### Walking Object Trees with Reflection

```typescript
import { EObject } from '@tripsnek/tmf';

// Process any object and its recursively contained children
function processTree(root: EObject) {
  console.log(`Processing ${root.eClass().getName()}`);
  
  // Iterate through entire containment tree of objects
  for (const ref of root.eClass().getEAllReferences()) {

    //only traverse containment refs
    if(ref.isContainment()){
      //process many-valued (EList)
      if(ref.isMany()){
        for (const containedObj of <EList<EObject>>obj.eGet(ref)){
          processTree(containedObj);
        }
      }
      //process single-valued
      else{
        const containedObj = obj.eGet(ref);
        if(containedObj){
          processTree(containedObj)
        }
      }
    }
  }
}

//...or you could just iterate the tree as a flattened
//array via eAllContents()
function processTreeWithEAllContainets(root: EObject) {
  console.log(`Processing ${root.eClass().getName()}`);
  
  // Iterate through entire containment tree of objects
  for (const child of root.eAllContents()) {
    console.log(`  Processing contained: ${child.eClass().getName()}`);
  }
}

// Dynamically access all attributes
function printAllAttributes(obj: EObject) {
  const eClass = obj.eClass();
  
  for (const attr of eClass.getEAllAttributes().elements()) {
    const value = obj.eGet(attr);
    console.log(`${attr.getName()}: ${value}`);
  }
}

// Find references to non-contained objects
function findReferences(obj: EObject) {
  const eClass = obj.eClass();
  
  for (const ref of eClass.getEAllReferences().elements()) {
    if (!ref.isContainment()) {  // Skip containment refs
      const value = obj.eGet(ref);
      if (value) {
        console.log(`Reference ${ref.getName()} points to ${value}`);
      }
    }
  }
}
```

## Examples and Resources

- **[TMF Ecore Editor](https://github.com/tripsnek/tmf-ecore-editor)** - VSCode extension for visual model editing
- **[TMF npm package](https://www.npmjs.com/package/@tripsnek/tmf)** - The installable TMF npm library 
- **[tmf-examples](https://github.com/tripsnek/tmf-examples)** - Complete applications demonstrating TMF patterns with Node, Angular, React, and Nx
- **[Eclipse EMF](https://eclipse.dev/emf/docs.html)** - Original EMF documentation
- **[TripSnek](https://www.tripsnek.com)** - Production application built with TMF

## Real-World Usage

TMF powers [TripSnek](https://www.tripsnek.com), a travel itinerary optimization app serving hundreds of thousands of users. It handles complex travel data models with dozens of entity types, automatic MongoDB persistence, and seamless client-server synchronization - all from a single model definition.

## License

TMF is MIT licensed. See [LICENSE](LICENSE) for details.

## Acknowledgments

TMF is inspired by the [Eclipse Modeling Framework](https://www.eclipse.org/modeling/emf/). While TMF is not a complete port of EMF, it brings the core benefits of model-driven development to the TypeScript ecosystem.
