import ExternalLink from '../ExternalLink/ExternalLink';

// This regex looks for markdown-style links with a title, example:
// [click here](http://example.com/)
const patterns = [
  { regex: /\[([^\]]+?)\]\(([^)]+?)\)/, render: (match) => <ExternalLink href={match[2]}>{match[1]}</ExternalLink> },
  { regex: /\*\*(.+?)\*\*/, render: (match) => <b>{match[1]}</b> },
  { regex: /`(.+?)`/, render: (match) => <code style={{ color: '#FFF'}}>{match[1]}</code> },
];

const TextWithAnchorsMarkup = ({ children }) => {
  const parseText = (text) => {
    let matchIndex = text.length; // Set an initial high value for matchIndex
    let matchedPattern = null;

    // Find the earliest match across all patterns
    patterns.forEach(({ regex }, index) => {
      const match = text.match(regex);
      if (match && match.index < matchIndex) {
        matchIndex = match.index;
        matchedPattern = { match, patternIndex: index };
      }
    });

    // If no match is found, return the text as-is
    if (!matchedPattern) {
      return text;
    }

    const { match, patternIndex } = matchedPattern;
    const { render } = patterns[patternIndex];

    // Split and process the text recursively
    return (
      <>
        {text.substring(0, match.index)}
        {render(match)}
        {parseText(text.substring(match.index + match[0].length))}
      </>
    );
  };

  return <span>{parseText(children)}</span>;
};

export default TextWithAnchorsMarkup;
