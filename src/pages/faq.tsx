import React from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for all items in original condition."
    },
    {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 3-5 business days, express shipping takes 1-2 business days."
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. Shipping costs vary by location."
    },
    {
        question: "How can I track my order?",
        answer: "You'll receive a tracking number via email once your order ships."
    }
];

const FAQ: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
            
            <div className="space-y-6">
                {faqData.map((item, index) => (
                    <div key={index} className="border-b pb-4">
                        <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                        <p className="text-gray-600">{item.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;