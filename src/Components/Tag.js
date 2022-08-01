const Tag = ({ tag, deleteTagHandler, editTagHandler, id }) => {
  const renderTagStyle = (inputColor) => {
    return {
      padding: "5px 10px",
      margin: "5px",
      color: "black",
      borderLeft: `3px solid ${inputColor}`,
    };
  };
  return (
    <div className="tag-container">
      <p key={id} style={renderTagStyle(tag.color)}>
        {tag.label}
      </p>
      <div className="tag-buttons">
        <button className="edit-button" onClick={() => editTagHandler(id)}>
          Edit
        </button>
        <button className="remove-button" onClick={() => deleteTagHandler(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Tag;
