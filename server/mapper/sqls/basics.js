const selectAllEquip = 
`SELECT equip_id,
equip_name,
equip_type
FROM t_equip
ORDER BY equip_id`;

module.exports = {
  selectAllEquip,
}