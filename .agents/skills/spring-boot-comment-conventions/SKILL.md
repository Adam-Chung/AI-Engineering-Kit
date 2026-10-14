---
name: spring-boot-comment-conventions
description: Traditional Chinese comment conventions for Java/Spring Boot backend projects in this workspace — trailing field comments on records, and inline formula/logic comments inside complex calculation methods. Use whenever creating or editing a `record` (DTO/entity/response/request), or writing/reviewing a method with multi-step business or financial calculations, so the resulting code matches this workspace's established maintenance-and-debugging-focused commenting style.
---

# Spring Boot Comment Conventions

Confirmed with the user (stock-analysis-back-end): beyond the class/method-level
Javadoc this codebase already writes generously, two more targeted kinds of
comment pull their weight for a solo maintainer coming back to debug or extend
the code months later. Both use Traditional Chinese, per this workspace's
general source-comment convention (`AI_COLLABORATION.md`), and both keep
established English technical terms (EPS, PER, PBR, BPS, API, DTO...) as-is
rather than translating them.

## Rule 1 — Trailing comment on every record field

Every component of a `record` gets a trailing `// <中文說明>` comment — even
fields whose name looks self-evident. The goal is that a reader scanning the
record top to bottom never has to guess which fields were "too obvious to
bother commenting" — full coverage reads faster than partial coverage,
because partial coverage forces a second guess ("was this skipped on purpose,
or just missed?"). This matters most for abbreviated financial/domain jargon
(`per`, `pbr`, `eps`, `bps`, `npl`, `roc`...) that isn't self-evident without
domain context, but apply it uniformly rather than cherry-picking.

```java
public record ValuationInput(
        BigDecimal currentPrice, // 最新收盤價
        int epsAvgYears, // EPS平均年數
        int bpsAvgYears, // BPS平均年數
        int targetPriceLevel, // 目標價等級
        List<YearlyPriceStats> yearlyPrices, // 年度價格統計
        List<YearlyValuationStats> yearlyValuations, // 年度估值統計
        List<YearlyEps> yearlyEps, // 年度EPS統計
        BigDecimal currentYearHighPrice, // 當年度最高價
        BigDecimal currentYearLowPrice // 當年度最低價
) {
}
```

**Exception:** if a record already documents its fields via `@param` entries
on the record's Javadoc block, don't add trailing `//` comments too — that's
the same information via a different existing convention already used
elsewhere in this codebase (e.g. `GroqProperties`, `QuarterRange`). Pick
whichever form the record already has and stay consistent within that file;
don't run both at once on the same field.

Applies to nested records the same way — a `record` declared inside a
controller/response class (e.g. an inner `record ApiError(...)`) follows the
same rule as a top-level one.

## Rule 2 — Inline comments for complex calculation logic

Inside a method with multi-step business or financial formulas, add a
`// <中文說明>` comment directly above the line(s) that compute each
meaningful intermediate value or formula step — especially when the local
variable name is short or abbreviated (`low10`, `epsXYearAvg`,
`tenYearAvgLowPer`...). These complement, not replace, the method-level
Javadoc: the Javadoc explains *what* the method does and *why*; the inline
comments pin *each formula step to its exact line*, which is what actually
helps mid-debugging, when you're staring at a stack trace pointing at one
specific line and need to know what that line means without re-deriving the
whole method from the top.

```java
// 10年低和10年高
BigDecimal low10 = minWithCurrentYear(
        prices.stream().map(YearlyPriceStats::lowPrice).min(BigDecimal::compareTo).orElseThrow(),
        input.currentYearLowPrice());
BigDecimal high10 = maxWithCurrentYear(
        prices.stream().map(YearlyPriceStats::highPrice).max(BigDecimal::compareTo).orElseThrow(),
        input.currentYearHighPrice());
...
// 便宜價 = (EPS X年平均 * 10年低PER) + (BPS X年平均 * 10年低PBR)
BigDecimal cheapPrice = averageOfTwo(
        epsXYearAvg.multiply(tenYearAvgLowPer), bpsXYearAvg.multiply(tenYearAvgLowPbr));
// 合理價 = (EPS X年平均 * 10年平均PER) + (BPS X年平均 * 10年平均PBR)
BigDecimal reasonablePrice = averageOfTwo(
        epsXYearAvg.multiply(tenYearAvgPer), bpsXYearAvg.multiply(tenYearAvgPbr));
```

(From `TargetPriceValuationService.calculate()` — note the formula comments
literally spell out the arithmetic in the variable's terms, so the comment
alone is enough to sanity-check the code against the business spec without
opening the spec doc.)

**Only worth adding when the method genuinely earns it** — multi-step
BigDecimal/financial-ratio chains, a formula with more than one named
variable feeding into it, or non-obvious conditional branching that
implements a specific business rule. Skip it on short, self-explanatory
methods where the variable names and a one-line Javadoc already say
everything (a 2-line delegation to a well-named helper doesn't need this).
When a private helper already has thorough method-level Javadoc that fully
explains its one formula, that's usually sufficient on its own — this rule is
for the *caller's* multi-step orchestration, not for re-explaining a helper
that already explains itself.

## What NOT to do

- Don't add comments to plain, non-record variables outside of the two rules
  above (e.g. a constructor-injected `private final FooRepository fooRepository;`
  doesn't need `// Foo repository`) — that's noise, not signal.
- Don't rewrite or duplicate an existing class/method Javadoc to satisfy this
  convention; these two rules are additive, not a replacement for the
  existing documentation style.
- Don't retrofit every already-well-named simple method just for the sake of
  coverage — the point is debugging leverage where formulas or abbreviations
  are genuinely opaque, not commenting for its own sake.
