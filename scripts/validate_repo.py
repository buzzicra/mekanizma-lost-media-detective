#!/usr/bin/env python3
"""Validate starter task package and local Markdown links."""

from __future__ import annotations

import re
from pathlib import Path
from urllib.parse import unquote


ROOT = Path(__file__).resolve().parents[1]
TASKS = ROOT / "docs" / "tasks"
PEOPLE = ROOT / "docs" / "kickoff" / "kisi-kartlari"
EXPECTED_TASKS = {
    "CASE-CONTRACT-01",
    "CASE-BUILD-01",
    "CASE-QUALITY-01",
    "EVID-CONTRACT-01",
    "EVID-BUILD-01",
    "EVID-QUALITY-01",
}
EXPECTED_PEOPLE = {
    "batincan-kantar",
    "burak-simsek",
    "cemresu-demir",
    "emir-kaan-cati",
    "kerim-tasci",
    "taylan-akgun",
}
REQUIRED_FIELDS = (
    "**Pod:**",
    "**Owner:**",
    "**Reviewer:**",
    "**Verifier:**",
    "**Depends on:**",
    "**Blocks:**",
    "## Kullanıcı sonucu",
    "## Teslim",
    "## Acceptance criteria",
    "## Bitiş kanıtı",
)
LINK_RE = re.compile(r"(?<!!)\[[^\]]+\]\(([^)]+)\)")
EMAIL_RE = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
IGNORED_PARTS = {
    ".git",
    ".next",
    ".pnpm-store",
    ".turbo",
    "coverage",
    "node_modules",
    "out",
    "playwright-report",
    "test-results",
}


def validate_tasks(errors: list[str]) -> None:
    found = {path.stem for path in TASKS.glob("*.md") if path.name != "README.md"}
    if found != EXPECTED_TASKS:
        errors.append(f"Task set mismatch: expected={sorted(EXPECTED_TASKS)} found={sorted(found)}")
    for path in sorted(TASKS.glob("*.md")):
        if path.name == "README.md":
            continue
        text = path.read_text(encoding="utf-8")
        for field in REQUIRED_FIELDS:
            if field not in text:
                errors.append(f"{path.relative_to(ROOT)} missing {field}")


def validate_people(errors: list[str]) -> None:
    found = {path.stem for path in PEOPLE.glob("*.md") if path.name != "README.md"}
    if found != EXPECTED_PEOPLE:
        errors.append(
            f"Participant set mismatch: expected={sorted(EXPECTED_PEOPLE)} found={sorted(found)}"
        )
    for path in sorted(PEOPLE.glob("*.md")):
        if path.name == "README.md":
            continue
        text = path.read_text(encoding="utf-8")
        for number in range(1, 9):
            if f"### Görev {number}:" not in text:
                errors.append(f"{path.relative_to(ROOT)} missing Görev {number}")


def validate_links_and_privacy(errors: list[str]) -> None:
    for path in sorted(ROOT.rglob("*.md")):
        if not IGNORED_PARTS.isdisjoint(path.relative_to(ROOT).parts):
            continue
        text = path.read_text(encoding="utf-8")
        if EMAIL_RE.search(text):
            errors.append(f"{path.relative_to(ROOT)} contains an email-like value")
        for raw_target in LINK_RE.findall(text):
            target = raw_target.split("#", 1)[0].strip()
            if not target or target.startswith(("http://", "https://", "mailto:")):
                continue
            resolved = (path.parent / unquote(target)).resolve()
            if not resolved.exists():
                errors.append(f"{path.relative_to(ROOT)} broken link: {raw_target}")


def main() -> int:
    errors: list[str] = []
    validate_tasks(errors)
    validate_people(errors)
    validate_links_and_privacy(errors)
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1
    print(
        "PASS: 6 active tasks, 6 participant cards with Görev 1-8, "
        "required fields, local links, privacy scan"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
