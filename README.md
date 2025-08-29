# TypeScript Modeling Framework (TMF)

[![npm version](https://img.shields.io/npm/v/@tripsnek/tmf.svg)](https://www.npmjs.com/package/@tripsnek/tmf)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

TMF is a lightweight TypeScript port of the Eclipse Modeling Framework (EMF) that brings industrial-strength model-driven development to the TypeScript ecosystem. Build type-safe, reflective data models that work seamlessly across your entire stack - from Node.js servers to React/Angular frontends.

## Why TMF?

Traditional TypeScript development requires writing the same boilerplate over and over: DTOs, validation, serialization, API endpoints, database mappings. TMF eliminates this repetition through powerful runtime reflection and code generation.

With TMF's reflection capabilities, you can build generic solutions that adapt automatically to model changes:
- REST APIs that generate themselves from your data model
- Serialization that handles complex object graphs with circular references  
- UI components that build themselves by introspecting your data
- Database persistence layers that require zero manual mapping

TMF provides the core metamodel and reflection infrastructure. The patterns shown in this README and the tmf-examples repository demonstrate what becomes possible when you have full runtime access to your model's structure.

### Real-World Usage

TMF powers [TripSnek](https://www.tripsnek.com), a European travel itinerary optimization app serving hundreds of thousands of users. It handles complex travel data models with 50+ entity types, automatic MongoDB persistence, and seamless client-server synchronization - all from a single model definition.

## Key Features

- **Runtime Reflection** - Complete introspection of your model's structure at runtime
- **Containment Hierarchies** - Parent-child relationships with automatic lifecycle management
- **Inverse Reference Maintenance** - Bidirectional relationships that stay in sync automatically
- **Code Generation** - Type-safe TypeScript from .ecore model definitions
- **TJson Serialization** - Built-in JSON serialization for complex object graphs
- **ELists** - Observable collections that maintain model consistency
- **EMF Compatible** - Works with existing .ecore files from Eclipse projects

## Installation

```bash
npm install @tripsnek/tmf
```

For visual model editing, install the VSCode extension:
1. Open VSCode
2. Search for "TMF Ecore Editor" in extensions
3. Install the extension

## Quick Start

### Step 1: Create Your Model

Create a new file `blog.ecore` in VSCode. The TMF Ecore Editor will auto-initialize it with:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ecore:EPackage xmi:version="2.0" xmlns:xmi="http://www.omg.org/XMI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:ecore="http://www.eclipse.org/emf/2002/Ecore" name="blog" nsURI="http://example.org/blog" nsPrefix="blog">
</ecore:EPackage>
```

Use the visual editor to add classes, attributes, and references. Or edit the XML directly:

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

Click "Generate Code" in the editor or run TMF's code generator. This creates type-safe TypeScript classes with full metamodel support.


You can also generate codeCreate a `generate.mjs` file in your project:

```javascript
import { generateFromEcore } from '@tripsnek/tmf';
await generateFromEcore('./path/to/your/my-model.ecore');
```

Run with: ```node generate.mjs```

### Step 3: Use Your Model

```typescript
import { BlogFactory, BlogPackage, Blog, Post } from './generated/blog';
import { TJson } from '@tripsnek/tmf';

// Initialize the package (required for serialization)
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
console.log(JSON.stringify(json, null, 2));

// Deserialize from JSON
const blogCopy = TJson.makeEObject(json) as Blog;
console.log(blogCopy.getPosts().get(0).getTitle()); // "Introduction to TMF"
```

## Leveraging Reflection

TMF's real power comes from its reflection capabilities. While TMF itself provides the metamodel infrastructure, you can build powerful generic solutions on top of it.

### Example: Building a Generic REST API

This example shows how reflection enables you to create REST endpoints that work with any TMF model:

```typescript
import express from 'express';
import { EClass, EObject, TJson, TUtils } from '@tripsnek/tmf';
import { BlogPackage } from './generated/blog';

const app = express();
app.use(express.json());

// Initialize your package
const pkg = BlogPackage.eINSTANCE;

// Storage for instances (in production, this would be a database)
const storage = new Map<string, Map<string, EObject>>();

// Get all root classes from your model
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

// Process any object and its contained children
function processTree(root: EObject) {
  console.log(`Processing ${root.eClass().getName()}`);
  
  // Iterate through all contained objects
  for (const child of root.eAllContents()) {
    console.log(`  Found contained: ${child.eClass().getName()}`);
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

// Find all references to other objects
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

## Core Concepts

### Containment

Containment relationships create parent-child hierarchies where children follow their parent's lifecycle:

```typescript
const blog = factory.createBlog();
const post1 = factory.createPost();
const post2 = factory.createPost();

// Posts are contained by blog
blog.getPosts().add(post1);
blog.getPosts().add(post2);

// When you serialize the blog, all contained posts are included
const json = TJson.makeJson(blog);  // Includes all posts

// When you delete the blog (in your application logic), 
// you should also handle contained objects
```

### Inverse References

TMF automatically maintains bidirectional relationships:

```typescript
const blog = factory.createBlog();
const post = factory.createPost();

// Setting one side...
blog.getPosts().add(post);

// ...automatically updates the other side
console.log(post.getBlog() === blog);  // true

// And vice versa
const post2 = factory.createPost();
post2.setBlog(blog);
console.log(blog.getPosts().contains(post2));  // true
```

### ELists

TMF uses EList for collections to maintain model integrity:

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

## Building Generic Solutions

The tmf-examples repository demonstrates several patterns you can implement using TMF's reflection:

- **Generic CRUD servers** that work with any model
- **Proxy resolution** for handling cross-references between object trees
- **Database persistence** layers that require no manual mapping
- **Dynamic UI generation** based on model structure
- **Model diffing and merging** for collaborative editing
- **Undo/redo systems** that track all changes generically

These aren't built into TMF - they're examples of what becomes possible when you have full runtime access to your model's structure.

## Examples and Resources

- **[TMF Ecore Editor](https://github.com/tripsnek/tmf-ecore-editor)** - VSCode extension for visual model editing
- **[tmf-examples](https://github.com/tripsnek/tmf-examples)** - Complete applications demonstrating TMF patterns with Node, Angular, React, and Nx
- **[TripSnek](https://www.tripsnek.com)** - Production application built with TMF

## Development

To contribute to TMF itself:

```bash
# Clone the repository
git clone https://github.com/tripsnek/tmf.git
cd tmf

# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test

# Watch mode for development
npm run build:watch
```

The library is built in multiple formats (ESM, CommonJS) with full TypeScript declarations.

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, and pull requests.

## License

TMF is MIT licensed. See [LICENSE](LICENSE) for details.

## Acknowledgments

TMF is inspired by the [Eclipse Modeling Framework](https://www.eclipse.org/modeling/emf/). While TMF is not a complete port of EMF, it brings the core benefits of model-driven development to the TypeScript ecosystem.

---

Ready to eliminate boilerplate and build better TypeScript applications? Install TMF and experience the power of model-driven development.

```bash
npm install @tripsnek/tmf
```