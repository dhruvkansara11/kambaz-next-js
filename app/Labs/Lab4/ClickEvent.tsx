"use client";
const hello = () => {
  alert("Hello World!");
};
const lifeIs = (good: string) => {
  alert(`Life is ${good}`);
};
export default function ClickEvent() {
  return (
    <div id="wd-click-event">
      <h2>Click Event</h2>
      <button
        onClick={hello}
        id="wd-hello-world-click"
        className="btn btn-secondary"
      >
        Hello World!
      </button>
      &nbsp;
      <button
        onClick={() => lifeIs("Good!")}
        id="wd-life-is-good-click"
        className="btn btn-secondary"
      >
        Life is Good!
      </button>
      &nbsp;
      <button
        onClick={() => {
          hello();
          lifeIs("Great!");
        }}
        id="wd-life-is-great-click"
        className="btn btn-secondary"
      >
        Life is Great!
      </button>
      <hr />
    </div>
  );
}
