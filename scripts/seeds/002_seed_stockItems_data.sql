Use [GIC Inventory Database];


INSERT INTO UnitOfMeasurement (Name, IsBaseUnit) VALUES  
    ('Roll', 1),
    ('20-Stack', 0),
    ('25-Stack', 0);


INSERT INTO StockItemCategory (Name, Description) VALUES
    ('Filter Paper', 'Paper-based material used for filtration during lab and production processes.'),
    ('Labels', 'Adhesive labels used for packaging, identification, and traceability.'),
    ('Extraction Thimbles', 'Porous containers used in Soxhlet and other extraction apparatus.'),
    ('Syringe Filters', 'Membrane-based filters used to remove particles from liquids.'),
    ('Packing Stock', 'Various packaging materials used to secure and ship products.');


INSERT INTO StockItemGroup (GroupID, Name, Description) VALUES
    -- Filter Paper
    (1, 'QLFV', 'High-purity cellulose filter paper for qualitative analysis. Moderate flow rate, fine particle retention.'),
    (2, 'QLF', 'Qualitative filter paper with fast flow rate and medium retention.'),
    (3, 'QLM', 'Qualitative filter paper with medium flow rate and particle retention.'),
    (4, 'QLS', 'Qualitative filter paper with slow flow and high particle retention.'),
    (5, 'AHF', 'Ashless filter paper - fast flow, fine retention.'),
    (6, 'AHM', 'Ashless filter paper - medium flow, general purpose.'),
    (7, 'AHS', 'Ashless filter paper - slow flow, high retention.'),
    (8, 'PAF', 'Prepleated ashless filter paper - fast flow.'),
    (9, 'PAM', 'Prepleated ashless filter paper - medium flow.'),
    (10, 'PAS', 'Prepleated ashless filter paper - slow flow.'),
    (11, 'NAF', 'Nitrate ashless filter paper - fast flow.'),
    (12, 'NAM', 'Nitrate ashless filter paper - medium flow.'),
    (13, 'NAS', 'Nitrate ashless filter paper - slow flow.'),
    (14, 'LAF', 'Low ash filter paper - fast flow.'),
    (15, 'LAM', 'Low ash filter paper - medium flow.'),
    (16, 'LAS', 'Low ash filter paper - slow flow.'),
    (17, 'IWS', 'Intermediate Wet-Strength paper for vacuum filtration.'),
    (18, 'IWSHD', 'Heavy-duty version of Intermediate Wet-Strength paper.'),
    (19, 'RGF(P)', 'Resin Glass Fiber prefilters for high-load filtration.'),
    (20, 'HR', 'Hardened ashless filter paper for gravimetric analysis.'),
    (21, 'PHASE SEP(PS)', 'Phase separator filter paper for separating aqueous/organic phases.'),

    -- Extraction Thimbles
    (22, 'Cellulose Extraction Thimbles', 'Thimbles for extraction using cellulose material.'),

    -- Labels
    (23, 'GIC Scientific Label', 'Custom GIC Scientific Label'),
    (24, 'Reseller Label', 'Labels used by resellers and distributors.'),

    -- Syringe Filters
    (25, 'ZapClean', 'ZapClean syringe filters for high-purity filtration.'),
    (26, 'Pink Ring hydrophilic', 'Hydrophilic syringe filters with pink ring for aqueous solutions.'),
    (27, 'Yellow Ring Nylon', 'Nylon syringe filters with yellow ring for general-purpose filtration.');


INSERT INTO StockItem (SKU, Name, Description, StockItemCategoryID, BaseUoMID, GroupID) VALUES
    ('QLVF-RL', 'QLVF Roll', 'High-purity cellulose filter paper, moderate flow, fine retention.', 1, 1, 1),
    ('QLVF-20S', 'QLVF 20-Stack', 'High-purity cellulose filter paper, moderate flow, fine retention.', 1, 2, 1),
    ('QLVF-25S', 'QLVF 25-Stack', 'High-purity cellulose filter paper, moderate flow, fine retention.', 1, 3, 1),
    ('GSSLGIC', 'GIC Scientific (Small)', 'Small GIC Scientific label', 2, 1, 23),
    ('GSBLGIC', 'GIC Scientific (Big)', 'Big GIC Scientific label', 2, 1, 23);


INSERT INTO StockItemAttribute (StockItemCategoryID, AttributeName) VALUES
    (1, 'Supplier Grade'),
    (2, 'Size');


INSERT INTO StockItemAttributeValue (StockItemID, AttributeID, AttributeValue) VALUES
    (1, 1, '609'),
    (2, 1, '609'),
    (3, 1, '609'),
    (4, 2, '55mmx22mm'),
    (5, 2, '98mmx49mm');
