export function resToDetail(word: string, res: any) {
  let detail = "## " + word + "\n\n";
  try {
    if (!res.translations.empty) {
      for (const x of res.translations.entryGroups) {
        detail += `##### ${x.gategory}\n---\n`;
        for (const y of x.entries) {
          detail += `1. ${y.text.replace("[[", "(").replace("]]", ")")} ${y.context ? "_" + y.context + "_" : ""}\n\n`;
        }
      }
    }
    if (!res.definitions.empty) {
      for (const x of res.definitions.entryGroups) {
        detail += `##### ${x.gategory}\n---\n`;
        for (const y of x.entries) {
          detail += `${y.text}\n\n`;
        }
      }
    }
    if (res.definitionsInDestLanguage && !res.definitionsInDestLanguage.empty) {
      detail += `##### DEFINITIONS IN DEST LANGUAGE\n---\n`;
      const regex = /\[\[([a-z]+)#(Finnish|English)\|\1\]\]/gm;
      for (const x of res.definitionsInDestLanguage.entryGroups) {
        detail += `* ${x.gategory}\n`;
        for (const y of x.entries) {
          detail += `\t1. ${y.text.replace(regex, '$1')}\n`;
        }
        detail += `\n`;
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
