import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'Carlos-Henreis/origami-diagram-archive',
  },
  collections: {
    diagrams: collection({
      label: 'Diagrams',
      slugField: 'title',
      path: 'src/content/diagrams/*',
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        
        originalAuthor: fields.text({
          label: 'Original Author'
        }),

        shortDescription: fields.text({
          label: 'Short Description'
        }),

        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images',
          publicPath: '/images'
        }),

        pdf: fields.file({
          label: 'Diagram PDF',
          directory: 'public/pdfs',
          publicPath: '/pdfs'
        }),

        description: fields.markdoc({
          label: 'Full Description',
          options: {
            image: {
              directory: 'public/diagram-images',
              publicPath: '/diagram-images'
            }
          }
        })
      }
    })
  }
});