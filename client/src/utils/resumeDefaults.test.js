import test from "node:test";
import assert from "node:assert/strict";
import {
  createBlankResume,
  migrateResumeData,
  parseResumeBackup,
  getResumeChecks,
  DEFAULT_SECTION_ORDER,
  STARTER_RESUME,
} from "./resumeDefaults.js";

test("partial user data never inherits sample achievements", () => {
  const resume = migrateResumeData({ personalInfo: { firstName: "Alex" } });
  assert.equal(resume.personalInfo.firstName, "Alex");
  assert.equal(resume.personalInfo.email, "");
  assert.equal(resume.summary, "");
  assert.deepEqual(resume.experience, []);
});
test("malformed nested data cannot crash forms or templates", () => {
  const resume = migrateResumeData({
    personalInfo: { firstName: {} },
    summary: null,
    skills: [{}, "React"],
    experience: [null, { position: "Engineer", responsibilities: {} }],
    customization: {
      sectionOrder: ["unknown", "skills", "skills"],
      color: "bad",
    },
  });
  assert.equal(resume.personalInfo.firstName, "");
  assert.equal(resume.summary, "");
  assert.deepEqual(resume.skills, ["React"]);
  assert.deepEqual(resume.experience[0].responsibilities, []);
  assert.equal(
    new Set(resume.customization.sectionOrder).size,
    DEFAULT_SECTION_ORDER.length,
  );
  assert.doesNotThrow(() => getResumeChecks(resume));
});
test("backup import rejects unrelated JSON and preserves real data", () => {
  for (const invalid of ["[]", "null", "{}", '{"personalInfo":[]}', "oops"])
    assert.throws(() => parseResumeBackup(invalid));
  const backup = parseResumeBackup(JSON.stringify(STARTER_RESUME));
  assert.equal(backup.personalInfo.email, STARTER_RESUME.personalInfo.email);
  assert.deepEqual(backup.skills, STARTER_RESUME.skills);
  assert.equal(backup.customization.template, "modern");
});
test("empty entries do not count as completed essentials", () => {
  const blank = createBlankResume();
  blank.experience = [{ company: " ", position: "" }];
  blank.education = [{ institution: "", degree: "" }];
  blank.skills = [" "];
  assert.equal(getResumeChecks(blank).filter((c) => c.done).length, 0);
});
test("legacy comma-separated skills and visibility survive migration", () => {
  const resume = migrateResumeData({
    personalInfo: {},
    skills: "React, CSS, ",
    customization: { sectionVisibility: { summary: false } },
  });
  assert.deepEqual(resume.skills, ["React", "CSS"]);
  assert.equal(resume.customization.sectionVisibility.summary, false);
});
