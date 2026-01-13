import Image from 'next/image';

/**
 * EventExamples section - Gallery of past events
 * Features photos/videos from previous events with optional descriptions
 */
export function EventExamples() {
  // TODO: Replace with actual images
  const eventImages = [
    { src: '/images/events/1.jpg', alt: 'Event 1', description: 'Birthday party' },
    { src: '/images/events/2.jpg', alt: 'Event 2', description: 'Corporate event' },
    { src: '/images/events/3.jpg', alt: 'Event 3', description: 'Concert' },
    { src: '/images/events/4.jpg', alt: 'Event 4', description: 'Private party' },
  ];

  return (
    <section id="event-examples" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Event Examples
        </h2>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden"
            >
              {/* Placeholder for images */}
              <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                <span className="text-neutral-400 text-sm">{image.alt}</span>
              </div>
              {/* TODO: Replace with actual Image component when images are available */}
              {/* <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                loading="lazy"
              /> */}
              
              {/* Description overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white text-sm font-medium">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
