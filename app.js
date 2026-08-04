(function () {
  const SECTIONS = {
    S: { label: "S", title: "S.", sub: "Just for S. No one else can see this browser's copy.", key: "dash_lists_S" },
    J: { label: "J", title: "J", sub: "Just for J. No one else can see this browser's copy.", key: "dash_lists_J" },
    both: { label: "Both", title: "Both.", sub: "The shared stuff. Groceries, plans, the whole list.", key: "dash_lists_both" },
  };

  const params = new URLSearchParams(window.location.search);
  const sectionKey = params.get("section") in SECTIONS ? params.get("section") : "both";
  const section = SECTIONS[sectionKey];

  document.body.dataset.section = sectionKey;
  document.title = section.label + " — Us";
  document.getElementById("section-name").textContent = section.label;
  document.getElementById("page-title").textContent = section.title;
  document.getElementById("page-sub").textContent = section.sub;

  const listsEl = document.getElementById("lists");
  const newListForm = document.getElementById("new-list-form");
  const newListInput = document.getElementById("new-list-input");

  function load() {
    try {
      const raw = localStorage.getItem(section.key);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function save(lists) {
    localStorage.setItem(section.key, JSON.stringify(lists));
  }

  function uid() {
    return Math.random().toString(36).slice(2, 10);
  }

  let lists = load();

  function render() {
    listsEl.innerHTML = "";

    if (lists.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "No lists yet. Add one above to get started.";
      listsEl.appendChild(empty);
      return;
    }

    lists.forEach((list) => {
      const card = document.createElement("div");
      card.className = "list-card";

      const head = document.createElement("div");
      head.className = "list-card-head";

      const h2 = document.createElement("h2");
      h2.textContent = list.name;
      head.appendChild(h2);

      const delListBtn = document.createElement("button");
      delListBtn.className = "btn-ghost";
      delListBtn.textContent = "Delete list";
      delListBtn.addEventListener("click", () => {
        lists = lists.filter((l) => l.id !== list.id);
        save(lists);
        render();
      });
      head.appendChild(delListBtn);

      card.appendChild(head);

      const ul = document.createElement("ul");
      ul.className = "list-items";

      list.items.forEach((item) => {
        const li = document.createElement("li");
        li.className = "list-item" + (item.done ? " done" : "");

        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = item.done;
        cb.addEventListener("change", () => {
          item.done = cb.checked;
          save(lists);
          render();
        });

        const span = document.createElement("span");
        span.textContent = item.text;

        const delBtn = document.createElement("button");
        delBtn.textContent = "\u00d7";
        delBtn.setAttribute("aria-label", "Remove item");
        delBtn.addEventListener("click", () => {
          list.items = list.items.filter((i) => i.id !== item.id);
          save(lists);
          render();
        });

        li.appendChild(cb);
        li.appendChild(span);
        li.appendChild(delBtn);
        ul.appendChild(li);
      });

      card.appendChild(ul);

      const addForm = document.createElement("form");
      addForm.className = "add-item-form";
      const addInput = document.createElement("input");
      addInput.type = "text";
      addInput.placeholder = "Add an item";
      addInput.autocomplete = "off";
      const addBtn = document.createElement("button");
      addBtn.type = "submit";
      addBtn.textContent = "Add";

      addForm.appendChild(addInput);
      addForm.appendChild(addBtn);
      addForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = addInput.value.trim();
        if (!text) return;
        list.items.push({ id: uid(), text, done: false });
        addInput.value = "";
        save(lists);
        render();
      });

      card.appendChild(addForm);
      listsEl.appendChild(card);
    });
  }

  newListForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = newListInput.value.trim();
    if (!name) return;
    lists.push({ id: uid(), name, items: [] });
    newListInput.value = "";
    save(lists);
    render();
  });

  render();
})();
