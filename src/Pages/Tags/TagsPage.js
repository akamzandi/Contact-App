import { useEffect, useRef } from "react";
import { BlockPicker, BlockPickerProps } from "react-color";
import Tag from "../../Components/Tag/Tag";
import "../../Pages/Tags/tagsPage.css";

const TagsPage = ({
  allTags,
  forSubmitTag,
  inputChangeHandlerTag,
  submitHandlerTag,
  deleteTagHandler,
  editTagHandler,
  editTagMode,
  handleTagColorChange,
}) => {
  const tagNameInputRef = useRef();

  useEffect(() => {
    tagNameInputRef.current.focus();
  }, [editTagMode, allTags]);

  const renderTags = () => {
    if (allTags) {
      return (
        <>
          {allTags.map((t) => (
            <Tag
              key={t.id}
              id={t.id}
              tag={t}
              deleteTagHandler={deleteTagHandler}
              editTagHandler={editTagHandler}
            />
          ))}
        </>
      );
    } else {
      return <p>Ther is no Tag!</p>;
    }
  };

  return (
    <div className="tagsPage">
      <h3>Tags Page</h3>
      <div className="tagsPage-container">
        <p className="sub-headline">Tags List</p>
        <div className="tags-container">
          {/* <p className="sub-headline">Tags List:</p> */}
          {renderTags()}
        </div>
        <p className="sub-headline">{editTagMode ? "Edit Tag" : "Add Tag"}</p>
        <div className="tags-controlPanel">
          {/* <p className="sub-headline">{editTagMode ? "Edit Tag" : "Add Tag"}</p> */}
          <form onSubmit={(e) => submitHandlerTag(e)}>
            <section className="tag-input-section">
              <label htmlFor="tag-name">Tag Name</label>
              <br />
              <input
                id="tag-name"
                type="text"
                placeholder="Enter tag name"
                name="label"
                value={forSubmitTag.label}
                ref={tagNameInputRef}
                onChange={(e) => inputChangeHandlerTag(e)}
              />
            </section>
            <div className="tag-color-pick">
              <p>Tag Color</p>
              <BlockPicker
                triangle="hide"
                width="14rem"
                color={forSubmitTag.color}
                onChange={(color) => handleTagColorChange(color.hex)}
              />
            </div>
            <button type="submit" className="submit-button">
              {editTagMode ? "Done" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TagsPage;
