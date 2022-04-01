export function resToDetail(word: string, res: any) {
  let detail = "# " + word + "\n\n";
  try {
    if (!res.translations.empty) {
      for (const x of res.translations.entryGroups) {
        detail += `##### ${x.gategory}\n---\n`;
        for (const y of x.entries) {
          detail += `${y.text} ${y.context ? "_" + y.context + "_" : ""}\n\n`;
        }
      }
    } else if (!res.definitions.empty) {
      for (const x of res.definitions.entryGroups) {
        detail += `##### ${x.gategory}\n---\n`;
        for (const y of x.entries) {
          detail += `${y.text}\n\n`;
        }
      }
    } else if (res.definitionsInDestLanguage && !res.definitionsInDestLanguage.empty) {
      for (const x of res.definitionsInDestLanguage.entryGroups) {
        detail += `##### ${x.gategory}\n---\n`;
        for (const y of x.entries) {
          detail += `${y.text}\n\n`;
        }
      }
    } else {
      detail += `##### NOT FOUND\n---\n`;
      for (const x in res.suggestions) {
        detail += `${x}\n\n`;
      }
    }
    if (res.subtitleResult && res.subtitleResult.resultList) {
      detail += `##### EXAMPLES\n---\n`;
      for (const x of res.subtitleResult.resultList) {
        detail += `* _${x.subtitle1}_\n${x.subtitle2}\n\n`;
      }
    }
  } catch (e) {
    console.log(e);
    detail += e;
  }
  if (detail === "") {
    detail = "No definition found.";
  }
  return detail;
}
