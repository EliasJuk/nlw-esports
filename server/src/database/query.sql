/* QUERY GERADA PELO PRISMA */
SELECT 
`main`.`Game`.`id`, `main`.`Game`.`title`, `main`.`Game`.`bannerUrl`, `aggr_selection_0_Ad`.`_aggr_count_ads` 
FROM `main`.`Game` 
LEFT JOIN (
  SELECT `main`.`Ad`.`gameId`, 
  COUNT(*) 
  AS `_aggr_count_ads` 
  FROM `main`.`Ad` 
  WHERE 1=1 
  GROUP BY `main`.`Ad`.`gameId`) 
  AS `aggr_selection_0_Ad` 
  ON (`main`.`Game`.`id` = `aggr_selection_0_Ad`.`gameId`) 
  WHERE 1=1 LIMIT ? OFFSET ? /* traceparent=00-00-00-00 */