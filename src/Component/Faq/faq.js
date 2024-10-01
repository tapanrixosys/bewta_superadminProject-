import React, { useState } from 'react';
import './faq.css'; // Move the CSS here or include it in your main style file

const FaqPage = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <div className="accordion-item-header" onClick={toggleAccordion}>
        <span className="accordion-item-header-title">{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-down accordion-item-header-icon"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      <div className="accordion-item-description-wrapper">
        <div className="accordion-item-description">
          <hr />
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

const Accordion = () => {
  const items = [
    {
      title: 'What is Bewta?',
      description: 'Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long. Ultimately, a paragraph is a sentence or group of sentences that support one main idea. In this handout, we will refer to this as the “controlling idea,” because it controls what happens in the rest of the paragraph.',
    },
    {
      title: 'How do I decide what to put in a paragraph?',
      description: 'Before you can begin to determine what the composition of a particular paragraph will be, you must first decide on an argument and a working thesis statement for your paper. What is the most important idea that you are trying to convey to your reader? The information in each paragraph must be related to that idea. In other words, your paragraphs should remind your reader that there is a recurrent relationship between your thesis and the information in each paragraph. A working thesis functions like a seed from which your paper, and your ideas, will grow. The whole process is an organic one—a natural progression from a seed to a full-blown paper where there are direct, familial relationships between all of the ideas in the paper.',
    },
    {
      title: 'Revised paragraph',
      description: 'Although most people consider piranhas to be quite dangerous, they are, for the most part, entirely harmless. Piranhas rarely feed on large animals; they eat smaller fish and aquatic plants. When confronted with humans, piranhas’ first instinct is to flee, not attack. Their fear of humans makes sense. Far more piranhas are eaten by people than people are eaten by piranhas. If the fish are well-fed, they won’t bite humans.',
    },
    {
      title: 'What payment methods do you accept',
      description: 'Although most people consider piranhas to be quite dangerous, they are, for the most part, entirely harmless. Piranhas rarely feed on large animals; they eat smaller fish and aquatic plants. When confronted with humans, piranhas’ first instinct is to flee, not attack. Their fear of humans makes sense. Far more piranhas are eaten by people than people are eaten by piranhas. If the fish are well-fed, they won’t bite humans.',
    },{
      title: 'How do I place an order?',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum ipsam odio voluptates ab quae beatae nihil illo alias vitae minima cumque atque, deleniti quos animi nostrum, veritatis quisquam ullam ducimus laboriosam reprehenderit sapiente, quo necessitatibus dolorem. Impedit sed, similique corporis quo totam, veniam consequatur blanditiis,',
    },{
      title: 'What is your return policy?',
      description: 'Although most people consider piranhas to be quite dangerous, they are, for the most part, entirely harmless. Piranhas rarely feed on large animals; they eat smaller fish and aquatic plants. When confronted with humans, piranhas’ first instinct is to flee, not attack. Their fear of humans makes sense. Far more piranhas are eaten by people than people are eaten by piranhas. If the fish are well-fed, they won’t bite humans.',
    },
  ];

  return (
    <main>
      <div className="accordion">
      <h3>Frequently Asked Questions</h3>
        {items.map((item, index) => (
          <FaqPage
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </main>
  );
};

export default Accordion;
